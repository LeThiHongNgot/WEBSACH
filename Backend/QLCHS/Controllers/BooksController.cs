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
    public class BooksController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public BooksController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(string id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(string id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookDetailsViewModel>> PostBook([FromBody] Book book)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'QLBANSACHContext.Books'  is null.");
            }
            _context.Books.Add(book);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            var bookDetail = await _context.Bookdetails.FindAsync(id);
            var bookImg = await _context.Bookimgs.FindAsync(id);
            var CartBook = await _context.Carts.Where(cr => cr.BookId == id).ToListAsync();
            var reviews = await _context.ProductReviews.Where(pr => pr.BookId == id).ToListAsync();
           // var orders = await _context.Orders.Where(o => o.BookId == id).ToListAsync();

            // Check for null references and remove related entities
            if (bookDetail != null)
            {
                _context.Bookdetails.Remove(bookDetail);
            }

            if (bookImg != null)
            {
                _context.Bookimgs.Remove(bookImg);
            }
            _context.ProductReviews.RemoveRange(reviews);
           // _context.Orders.RemoveRange(orders);
            _context.Carts.RemoveRange(CartBook);
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("details/images/{id}")]
        public async Task<ActionResult<BookDetailsViewModel>> GetBookDetailsWithImagesById(string id)
        {
            var query = from book in _context.Books
                        join bookDetail in _context.Bookdetails on book.Id equals bookDetail.BookId
                        join bookImg in _context.Bookimgs on book.Id equals bookImg.BookId
                        where book.Id == id  // Filter by the provided book ID
                        select new BookDetailsViewModel
                        {
                            BookId = book.Id,
                            Title = book.Title,
                            AuthorName = book.Author.Name,
                            AuthorId=book.AuthorId,
                            SupplierName = book.Supplier.Name,
                            Supplierid = book.SupplierId,
                            UnitPrice = book.UnitPrice,
                            PricePercent = book.PricePercent,
                            PublishYear = book.PublishYear,
                            Available = book.Available,
                            Quantity = book.Quantity,
                            CatergoryID=book.Bookdetail.CategoryId,
                            CategoryName = book.Bookdetail.Category.Name,
                            Dimensions = book.Bookdetail.Dimensions,
                            Pages = book.Bookdetail.Pages,
                            Description = book.Bookdetail.Description,
                            Image0 = book.Bookimg.Image0,
                            Image1 = book.Bookimg.Image1,
                            Image2 = book.Bookimg.Image2,
                            Image3 = book.Bookimg.Image3
                        };

            var result = await query.SingleOrDefaultAsync();

            if (result == null)
            {
                return NotFound(); // Book with the specified ID not found
            }

            return Ok(result);
        }


        [HttpGet("details/images")]
        public async Task<ActionResult<IEnumerable<BookDetailsViewModel>>> GetBookDetailsWithImages()
        {
            var query = from book in _context.Books
                        join bookDetail in _context.Bookdetails on book.Id equals bookDetail.BookId
                        join bookImg in _context.Bookimgs on book.Id equals bookImg.BookId
                        select new BookDetailsViewModel
                        {
                            BookId = book.Id,
                            Title = book.Title,
                            AuthorName = book.Author.Name,
                            AuthorId = book.AuthorId,
                            SupplierName = book.Supplier.Name,
                            Supplierid = book.SupplierId,
                            UnitPrice = book.UnitPrice,
                            PricePercent = book.PricePercent,
                            PublishYear = book.PublishYear,
                            Available = book.Available,
                            Quantity = book.Quantity,
                            CatergoryID = book.Bookdetail.CategoryId,
                            CategoryName = book.Bookdetail.Category.Name,
                            Dimensions = book.Bookdetail.Dimensions,
                            Pages = book.Bookdetail.Pages,
                            Description = book.Bookdetail.Description,
                            Image0 = book.Bookimg.Image0,
                            Image1 = book.Bookimg.Image1,
                            Image2 = book.Bookimg.Image2,
                            Image3 = book.Bookimg.Image3
                        };

            var result = await query.ToListAsync();

            return Ok(result);
        }

        [HttpGet("details/books")]
        public async Task<ActionResult<IEnumerable<BookDetailsViewModel>>> GetBookDetailsWithImagesByCategory(
     [FromQuery] string categoryId = "",
     [FromQuery] int page = 1,
     [FromQuery] int pageSize = 8)
        {
            IQueryable<BookDetailsViewModel> query = _context.Books
                .Where(book => string.IsNullOrEmpty(categoryId) || book.Bookdetail.CategoryId == categoryId)
                .Select(book => new BookDetailsViewModel
                {
                    BookId = book.Id,
                    Title = book.Title,
                    AuthorName = book.Author.Name,
                    AuthorId = book.AuthorId,
                    SupplierName = book.Supplier.Name,
                    Supplierid = book.SupplierId,
                    UnitPrice = book.UnitPrice,
                    PricePercent = book.PricePercent,
                    PublishYear = book.PublishYear,
                    Available = book.Available,
                    Quantity = book.Quantity,
                    CatergoryID = book.Bookdetail.CategoryId,
                    CategoryName = book.Bookdetail.Category.Name,
                    Dimensions = book.Bookdetail.Dimensions,
                    Pages = book.Bookdetail.Pages,
                    Description = book.Bookdetail.Description,
                    Image0 = book.Bookimg.Image0,
                    Image1 = book.Bookimg.Image1,
                    Image2 = book.Bookimg.Image2,
                    Image3 = book.Bookimg.Image3
                });

            // Get the total count of books for the specified category (or all books)
            var totalCount = await query.CountAsync();
            var result = await query
                           .Skip((page - 1) * pageSize)
                           .Take(pageSize)
                           .ToListAsync();

            return Ok(new { TotalCount = totalCount, Data = result });
        }

        private bool BookExists(string id)
        {
            return (_context.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetBooksCount()
        {
            int bookCount = _context.Books.Count();
            return Ok(bookCount);
        }
    }
 
}
