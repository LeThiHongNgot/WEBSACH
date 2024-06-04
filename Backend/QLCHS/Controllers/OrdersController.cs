using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLCHS.Entities;

namespace QLCHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public OrdersController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderWithDetails>>> GetOrdersWithDetails([FromQuery] byte? status)
        {
            var query = _context.Orders
                .Include(o => o.Book)
                .Include(o => o.Customer)
                .Where(o => o.Book != null && o.Customer != null);

            if (status.HasValue)
            {
                query = query.Where(o => o.Status == status);
            }

            var ordersWithDetails = await query
                .Select(o => new OrderWithDetails
                {
                    Id = o.Id,
                    CustomerId = o.CustomerId,
                    Phone = o.Customer.Phone,
                    CustomerName = o.Customer.FullName,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    Address = o.Address,
                    Description = o.Description,
                    UnitPrice = o.UnitPrice,
                    Quantity = o.Quantity,
                    BookName = o.Book.Title, // Replace 'Name' with the actual property name in your Book entity
                })
                .ToListAsync();

            return ordersWithDetails;
        }


        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        [HttpGet("History/{customerId}/{description}")]
        public async Task<ActionResult<IEnumerable<OrderWithDetails>>> GetShoppingOrder(string customerId, string description)
        {
            var query = _context.Orders
                .Include(o => o.Book)
                .Include(o => o.Customer)
                .Where(o => o.CustomerId == customerId);

            if (!string.IsNullOrEmpty(description))
            {
                // Assuming the Description field is of type nvarchar(max)
                query = query.Where(o => EF.Functions.Like(o.Description, description));
            }

            var ordersWithDetails = await query
                .Select(o => new OrderWithDetails
                {
                    Id = o.Id,
                    CustomerId = o.CustomerId,
                    Phone = o.Customer.Phone,
                    CustomerName = o.Customer.FullName,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    Address = o.Address,
                    Description = o.Description,
                    UnitPrice = o.UnitPrice,
                    Quantity = o.Quantity,
                    BookName = o.Book.Title,
                })
                .ToListAsync();

            return Ok(ordersWithDetails);
        }



        [HttpGet("History/{customerId}")]
        public async Task<ActionResult<IEnumerable<ShoppingCartItem>>> GetShoppingOrder(string customerId)
        {

            var orders = await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .ToListAsync();

            var shoppingCartItems = new List<ShoppingCartItem>();

            foreach (var order in orders)
            {
                var existingCartItem = shoppingCartItems.FirstOrDefault(item => item.Description == order.Description);

                if (existingCartItem != null)
                {
                    existingCartItem.Quantity.Add(order.Quantity.ToString());
                    existingCartItem.BookIds.Add(order.BookId);
                    existingCartItem.Price.Add(order.UnitPrice.ToString());
                    var bookimg = await _context.Bookimgs.FindAsync(order.BookId);
                    var bookTitle = await _context.Books.FindAsync(order.BookId);
                    // Kiểm tra nếu có thông tin từ bảng Bookimg
                    if (bookimg != null)
                    {
                        existingCartItem.Image0.Add(bookimg.Image0);

                    }
                    if (bookTitle != null)
                    {
                        existingCartItem.Title.Add(bookTitle.Title);
                    }
                }
                else
                {
                    // If not, create a new cart item
                    var cartItem = new ShoppingCartItem
                    {
                        status = order.Status,
                        Description = order.Description,
                        Image0 = new List<string>(),
                        Title = new List<string>(),
                        BookIds = new List<string> { order.BookId },
                        Quantity = new List<string> { order.Quantity.ToString() },
                        Price = new List<string> { order.UnitPrice.ToString() },
                        // Add other properties as needed
                    };

                    var bookimg = await _context.Bookimgs.FindAsync(order.BookId);
                    var bookTitle = await _context.Books.FindAsync(order.BookId);

                    if (bookimg != null)
                    {
                        cartItem.Image0.Add(bookimg.Image0);
                    }

                    if (bookTitle != null)
                    {
                        cartItem.Title.Add(bookTitle.Title);
                    }

                    shoppingCartItems.Add(cartItem);
                }
            }

            return Ok(shoppingCartItems);
        }


        // The DTO classes remain the same as in the previous example

        [HttpGet("customer/{idCustomer}/orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetCustomerOrders(string idCustomer)
        {
            var orders = await _context.Orders
                .Where(o => o.CustomerId == idCustomer)
                .ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound($"No orders found for customer with ID {idCustomer}.");
            }

            return orders;
        }
        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(string id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("update-status/{customerId}/{description}")]
        public async Task<IActionResult> UpdateOrderStatus(string customerId, string description)
        {
            try
            {
                var ordersToUpdate = await _context.Orders
                    .Where(o => o.CustomerId == customerId && EF.Functions.Like(o.Description, description))
                    .ToListAsync();

                if (ordersToUpdate == null || ordersToUpdate.Count == 0)
                {
                    return NoContent(); // Return 204 No Content when no orders are found
                }

                foreach (var order in ordersToUpdate)
                {
                    // Check if the current order is in a state where it can be updated to Status 1
                    if (order.Status == 0) // Assuming 0 is the initial status
                    {
                        order.Status = 1; // Update the status to 1
                        _context.Entry(order).State = EntityState.Modified;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = $"Bad request: {ex.Message}" });
            }
        }


        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
          if (_context.Orders == null)
          {
              return Problem("Entity set 'QLBANSACHContext.Orders'  is null.");
          }
            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(string id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
