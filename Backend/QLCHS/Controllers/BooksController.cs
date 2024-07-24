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
        [HttpPut]
        public async Task<IActionResult> PutBook([FromForm] BookAllViewModel bookDetails)
        {

            if (_context.Books == null)
            {
                return Problem("Entity set 'QLBANSACHContext.Books' is null.");
            }

            // Find the existing book
            var book = await _context.Books.FindAsync(bookDetails.BookId);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            // Step 3: Update the Book object
            book.Title = bookDetails.Title;
            book.AuthorId = bookDetails.AuthorId;
            book.SupplierId = bookDetails.Supplierid;
            book.UnitPrice = bookDetails.UnitPrice ?? book.UnitPrice;
            book.PricePercent = bookDetails.PricePercent ?? book.PricePercent;
            book.PublishYear = bookDetails.PublishYear ?? book.PublishYear;
            book.Available = bookDetails.Available ?? book.Available;
            book.Quantity = bookDetails.Quantity ?? book.Quantity;

            // Find the existing Bookimg
            var bookImg = await _context.Bookimgs.FindAsync(bookDetails.BookId);
            if (bookImg != null)
            {
                // Step 4: Update image files in Bookimg object
                bookImg.Image0 = await SaveImage(bookDetails.Image0) ?? bookImg.Image0;
                bookImg.Image1 = await SaveImage(bookDetails.Image1) ?? bookImg.Image1;
                bookImg.Image2 = await SaveImage(bookDetails.Image2) ?? bookImg.Image2;
                bookImg.Image3 = await SaveImage(bookDetails.Image3) ?? bookImg.Image3;
            }
            else
            {
                // Create a new Bookimg if it doesn't exist
                bookImg = new Bookimg
                {
                    BookId = bookDetails.BookId,
                    Image0 = await SaveImage(bookDetails.Image0),
                    Image1 = await SaveImage(bookDetails.Image1),
                    Image2 = await SaveImage(bookDetails.Image2),
                    Image3 = await SaveImage(bookDetails.Image3)
                };
                _context.Bookimgs.Add(bookImg);
            }

            // Find the existing Bookdetail
            var bookDetail = await _context.Bookdetails.FindAsync(bookDetails.BookId);
            if (bookDetail != null)
            {
                // Step 5: Update the Bookdetail object
                bookDetail.CategoryId = bookDetails.CatergoryID;
                bookDetail.Dimensions = bookDetails.Dimensions ?? bookDetail.Dimensions;
                bookDetail.Pages = bookDetails.Pages ?? bookDetail.Pages;
                bookDetail.Description = bookDetails.Description ?? bookDetail.Description;
            }
            else
            {
                // Create a new Bookdetail if it doesn't exist
                bookDetail = new Bookdetail
                {
                    BookId = bookDetails.BookId,
                    CategoryId = bookDetails.CatergoryID,
                    Dimensions = bookDetails.Dimensions,
                    Pages = bookDetails.Pages ?? 0,
                    Description = bookDetails.Description
                };
                _context.Bookdetails.Add(bookDetail);
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(bookDetails.BookId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Indicate that the update was successful
        }


        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookAllViewModel>> PostBook([FromForm] BookAllViewModel bookDetails)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'QLBANSACHContext.Books' is null.");
            }

            // Step 1: Get the last book by ID in descending order
            var lastBook = await _context.Books
                                        .OrderByDescending(b => b.Id)
                                        .FirstOrDefaultAsync();

            // Step 2: Generate the new ID
            string newId = "B001"; // Default new ID if there are no books yet
            if (lastBook != null)
            {
                string lastId = lastBook.Id;
                if (lastId.StartsWith("B"))
                {
                    int lastNumericId = int.Parse(lastId.Substring(1));
                    newId = "B" + (lastNumericId + 1).ToString("D3");
                }
            }

            // Step 3: Create the Book object and assign the new ID
            var book = new Book
            {
                Id = newId,
                Title = bookDetails.Title,
                AuthorId = bookDetails.AuthorId,
                SupplierId = bookDetails.Supplierid,
                UnitPrice = bookDetails.UnitPrice ?? 0,
                PricePercent = bookDetails.PricePercent ?? 0,
                PublishYear = bookDetails.PublishYear ?? 0,
                Available = bookDetails.Available ?? true,
                Quantity = bookDetails.Quantity ?? 0
            };

            // Step 4: Handle image files and create the Bookimg object
            var bookImg = new Bookimg
            {
                BookId = newId,
                Image0 = await SaveImage(bookDetails.Image0),
                Image1 = await SaveImage(bookDetails.Image1),
                Image2 = await SaveImage(bookDetails.Image2),
                Image3 = await SaveImage(bookDetails.Image3)
            };

            // Step 5: Create the Bookdetail object
            var bookDetail = new Bookdetail
            {
                BookId = newId,
                CategoryId = bookDetails.CatergoryID,
                Dimensions = bookDetails.Dimensions,
                Pages = bookDetails.Pages ?? 0,
                Description = bookDetails.Description
            };

            // Add the book, bookImg, and bookDetail to the context
            _context.Books.Add(book);
            _context.Bookimgs.Add(bookImg);
            _context.Bookdetails.Add(bookDetail);

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

        private async Task<string> SaveImage(IFormFile imageFile)
        {
            if (imageFile != null)
            {
                var filePath = Path.Combine("wwwroot/assets/productImg", imageFile.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                return "/assets/productimg/" + imageFile.FileName;
            }
            return null;
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
            // Define the base URL
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            // Define the query
            var query = from book in _context.Books
                        join bookDetail in _context.Bookdetails on book.Id equals bookDetail.BookId
                        join bookImg in _context.Bookimgs on book.Id equals bookImg.BookId
                        where book.Id == id  // Filter by the provided book ID
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
                            CatergoryID = bookDetail.CategoryId,
                            CategoryName = bookDetail.Category.Name,
                            Dimensions = bookDetail.Dimensions,
                            Pages = bookDetail.Pages,
                            Description = bookDetail.Description,
                            Image0 = $"{baseUrl}/{bookImg.Image0}",
                            Image1 = $"{baseUrl}/{bookImg.Image1}",
                            Image2 = $"{baseUrl}/{bookImg.Image2}",
                            Image3 = $"{baseUrl}/{bookImg.Image3}"
                        };

            // Execute the query and get the result
            var result = await query.SingleOrDefaultAsync();

            // Check if the result is null
            if (result == null)
            {
                return NotFound(); // Book with the specified ID not found
            }

            return Ok(result);
        }


        [HttpGet("details/images")]
        public async Task<ActionResult<IEnumerable<BookDetailsViewModel>>> GetBookDetailsWithImages()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
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
                            Image0 = $"{baseUrl}/{bookImg.Image0}",
                            Image1 = $"{baseUrl}/{bookImg.Image1}",
                            Image2 = $"{baseUrl}/{bookImg.Image2}",
                            Image3 = $"{baseUrl}/{bookImg.Image3}"
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
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
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
                    Image0 = $"{baseUrl}/{book.Bookimg.Image0}",
                    Image1 = $"{baseUrl}/{book.Bookimg.Image1}",
                    Image2 = $"{baseUrl}/{book.Bookimg.Image2}",
                    Image3 = $"{baseUrl}/{book.Bookimg.Image3}",
                    AverageRating = _context.ProductReviews
                                        .Where(pr => pr.BookId == book.Id)
                                        .Average(pr => (double?)pr.Rating) ?? 0  // Tính toán giá trị trung bình đánh giá
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
