using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLCHS.DTO;
using QLCHS.Entities;

namespace QLCHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public BillsController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Bills
        [HttpGet("orderNotSuccess")]
        public ActionResult<IEnumerable<BillWithOrdersDTO>> GetAllBillsWithCustomerInfo()
        {
            var billsWithCustomerInfo = _context.Bills
                .Join(_context.Orders,
                      b => b.Id,
                      o => o.BillId,
                      (b, o) => new { Bill = b, Order = o })
                .Join(_context.Customers,
                      bo => bo.Order.CustomerId,
                      c => c.Id,
                      (bo, c) => new { bo.Bill, Customer = c, bo.Order.OrderDate })
                .Where(boc => boc.Bill.PaymentStatus == "Chưa Thanh Toán" || boc.Bill.Status != "Đã Giao")
                .GroupBy(boc => boc.Bill.Id)
                .Select(g => new BillWithCustomerDTO
                {
                    Id = g.Key,
                    CustomerName = g.First().Customer.FullName,
                    OrderDate = g.Min(bo => bo.OrderDate), // or Max(bo => bo.OrderDate) if you want the latest date
                    TotalAmount = g.First().Bill.TotalAmount,
                    PaymentStatus = g.First().Bill.PaymentStatus,
                    Status = g.First().Bill.Status
                })
                .ToList();

            return Ok(billsWithCustomerInfo);
        }
        [HttpGet("orderSuccess")]
        public ActionResult<IEnumerable<BillWithOrdersDTO>> GetAllBillsSuccessInfo()
        {
            var billsWithCustomerInfo = _context.Bills
                .Join(_context.Orders,
                      b => b.Id,
                      o => o.BillId,
                      (b, o) => new { Bill = b, Order = o })
                .Join(_context.Customers,
                      bo => bo.Order.CustomerId,
                      c => c.Id,
                      (bo, c) => new { bo.Bill, Customer = c, bo.Order.OrderDate })
                .Where(boc => (boc.Bill.PaymentStatus == "Đã Thanh Toán"|| boc.Bill.PaymentStatus == "Vnpay"|| boc.Bill.PaymentStatus == "Paypal") && boc.Bill.Status == "Đã Giao")
                .GroupBy(boc => boc.Bill.Id)
                .Select(g => new BillWithCustomerDTO
                {
                    Id = g.Key,
                    CustomerName = g.First().Customer.FullName,
                    OrderDate = g.Min(bo => bo.OrderDate), // or Max(bo => bo.OrderDate) if you want the latest date
                    TotalAmount = g.First().Bill.TotalAmount,
                    PaymentStatus = g.First().Bill.PaymentStatus,
                    Status = g.First().Bill.Status
                })
                .ToList();

            return Ok(billsWithCustomerInfo);
        }
        [HttpGet("customer/{customerId}/status/{status}")]
        public async Task<ActionResult<IEnumerable<BillstatusDTO>>> GetBillsByCustomerAndStatus(string customerId, string status)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var billsWithCustomerInfo = await _context.Bills
                .Join(_context.Orders,
                      b => b.Id,
                      o => o.BillId,
                      (b, o) => new { Bill = b, Order = o })
                .Join(_context.Customers,
                      bo => bo.Order.CustomerId,
                      c => c.Id,
                      (bo, c) => new { bo.Bill, Customer = c, bo.Order })
                .Join(_context.Books,
                      boc => boc.Order.BookId,
                      book => book.Id,
                      (boc, book) => new { boc.Bill, boc.Customer, boc.Order, Book = book })
                .Join(_context.Bookimgs,
                      bocb => bocb.Book.Id,
                      bookimg => bookimg.BookId,
                      (bocb, bookimg) => new { bocb.Bill, bocb.Customer, bocb.Order, bocb.Book, BookImage = bookimg.Image0 })
                .Where(bocb => bocb.Customer.Id == customerId && bocb.Bill.Status == status)
                .GroupBy(bocb => new
                {
                    bocb.Bill.Id,
                    bocb.Bill.UserId,
                    bocb.Customer.FullName,
                    bocb.Customer.Phone,
                    bocb.Customer.Address,
                    bocb.Bill.BillDate,
                    bocb.Bill.TotalAmount,
                    bocb.Bill.PaymentStatus,
                    bocb.Bill.Status
                })
                .Select(g => new BillstatusDTO
                {
                    Id = g.Key.Id,
                    UserId = g.Key.UserId,
                    CustomerName = g.Key.FullName,
                    PhoneNumber = g.Key.Phone,
                    Address = g.Key.Address,
                    BillDate = g.Key.BillDate,
                    TotalAmount = g.Key.TotalAmount,
                    PaymentStatus = g.Key.PaymentStatus,
                    Status = g.Key.Status,
                    OrderDetails = g.Select(o => new OrdersDTO
                    {
                        Id = o.Order.Id,
                        CustomerId = o.Order.CustomerId,
                        OrderDate = o.Order.OrderDate,
                        Address = o.Order.Address,
                        Description = o.Order.Description,
                        UnitPrice = o.Order.UnitPrice,
                        Quantity = o.Order.Quantity,
                        BookId = o.Book.Id,
                        BillId = o.Order.BillId,
                        BookImage = $"{baseUrl}/{o.BookImage}" // Thêm hình ảnh sách vào OrderDetailDTO
                    }).ToList()
                })
                .ToListAsync();

            if (billsWithCustomerInfo == null || !billsWithCustomerInfo.Any())
            {
                return NotFound(new { Message = "No bills found for the specified customer and status" });
            }

            return Ok(billsWithCustomerInfo);
        }


        [HttpGet("withorderbill/{billId}")]
        public ActionResult<IEnumerable<BillWithOrdersDTO>> GetAllBillsWithOrderInfo(string billId)
        {
            var BillWithOrdersDTOInfo = _context.Bills
                .Where(b => b.Id == billId) // Filter by billId if needed
                .Join(_context.Orders,
                      b => b.Id,
                      o => o.BillId,
                      (b, o) => new { Bill = b, Order = o })
                .Join(_context.Customers,
                      bo => bo.Order.CustomerId,
                      c => c.Id,
                      (bo, c) => new { bo.Bill, Customer = c, bo.Order })
                .Select(bo => new BillWithOrdersDTO
                {
                    Id = bo.Bill.Id,
                    UserId = bo.Bill.UserId,
                    NameUser = bo.Bill.User.FullName, // Assuming you have User navigation property
                    VoucherId = bo.Bill.VoucherId,
                    BillDate = bo.Bill.BillDate,
                    TotalAmount = bo.Bill.TotalAmount,
                    PaymentStatus = bo.Bill.PaymentStatus,
                    Status = bo.Bill.Status,
                    CustomerId = bo.Customer.Id,
                    NameCustomer = bo.Customer.FullName,
                    PhoneNumber = bo.Customer.Phone, // Include PhoneNumber from Customer
                    OrderDate = bo.Order.OrderDate,
                    Address = bo.Order.Address,
                    Description = bo.Order.Description,
                    UnitPrice = bo.Order.UnitPrice,
                    Quantity = bo.Order.Quantity,
                    BookId = bo.Order.BookId,
                    NameBook = bo.Order.Book.Title // Assuming you have Book navigation property
                })
                .ToList();

            return Ok(BillWithOrdersDTOInfo);
        }


        // GET: api/Bills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(string id)
        {
          if (_context.Bills == null)
          {
              return NotFound();
          }
            var bill = await _context.Bills.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        // PUT: api/Bills/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/{status}")]
        public async Task<IActionResult> UpdateBillStatus(string id, string status)
        {
            var bill = await _context.Bills.FindAsync(id);

            if (bill == null)
            {
                return NotFound();
            }

            bill.Status = status;
            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
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

        [HttpPut("update/{id}/{paymentstatus}")]
        public async Task<IActionResult> UpdatePaymentStatus(string id, String paymentstatus)
        {
            // Find the bill by id
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
            {
                return NotFound(new { message = "Bill not found" });
            }

            // Update the payment status
            bill.PaymentStatus = paymentstatus;

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating bill", details = ex.Message });
            }

            return NoContent();
        }
    


    // POST: api/Bills
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
        public async Task<ActionResult<Bill>> CreateBill(BillDTO billDTO)
        {
            // Kiểm tra tính hợp lệ của dữ liệu billDTO nếu cần thiết
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tạo một đối tượng Bill từ BillDTO
            Bill bill = new Bill
            {
                Id = billDTO.Id, // Đặt Id của Bill từ BillDTO
                UserId = billDTO.UserId,
                VoucherId = billDTO.VoucherId,
                BillDate = billDTO.BillDate,
                TotalAmount = billDTO.TotalAmount,
                PaymentStatus = billDTO.PaymentStatus,
                Status = billDTO.Status
            };

            // Thêm bill vào DbContext và lưu vào CSDL
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBill), new { id = bill.Id }, bill);
        }

        // DELETE: api/Bills/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(string id)
        {
            if (_context.Bills == null)
            {
                return NotFound();
            }
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool BillExists(string id)
        {
            return (_context.Bills?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
