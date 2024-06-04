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
    public class ProductReviewsController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public ProductReviewsController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/ProductReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReviewDTO>>> GetProductReviewsWithDetails(
    [FromQuery] int? page = null,
    [FromQuery] int? pageSize = null)
        {
            IQueryable<ProductReviewDTO> query = _context.ProductReviews
                .Join(
                    _context.Customers,
                    review => review.CustomerId,
                    customer => customer.Id,
                    (review, customer) => new { Review = review, Customer = customer }
                )
                .Join(
                    _context.Books,
                    combined => combined.Review.BookId,
                    book => book.Id,
                    (combined, book) => new ProductReviewDTO
                    {
                        Id=combined.Review.Id,
                        CustomerName = combined.Customer.FullName,
                        BookTitle = book.Title,
                        Rating = combined.Review.Rating,
                        Comment = combined.Review.Comment,
                        NgayComment = combined.Review.NgayCommemt
                        // Add other properties as needed
                    }
                );

            var totalCount = await query.CountAsync();

            if (page.HasValue && pageSize.HasValue)
            {
                // Paginate the results
                query = query.Skip((page.Value - 1) * pageSize.Value)
                             .Take(pageSize.Value);
            }

            var reviewsWithDetails = await query.ToListAsync();

            return Ok(new { TotalCount = totalCount, Data = reviewsWithDetails });
        }


        [HttpGet("books/{bookId}")]
        public async Task<ActionResult<IEnumerable<ProductReview>>> GetProductReviewsbookId(string bookId)
        {
            // Validate the bookId parameter
            if (string.IsNullOrEmpty(bookId))
            {
                return BadRequest("BookId parameter is required.");
            }

            // Retrieve product reviews based on the provided BookId
            var productReviewsWithCustomerNames = await _context.ProductReviews
                .Include(pr => pr.Customer) // Include Customer navigation property
                .Where(pr => pr.BookId == bookId)
                .ToListAsync();

            if (productReviewsWithCustomerNames == null || productReviewsWithCustomerNames.Count == 0)
            {
                return NotFound($"No product reviews found for BookId: {bookId}");
            }

            // Optionally, you can project the result to a DTO (Data Transfer Object) to avoid circular reference issues.
            var result = productReviewsWithCustomerNames.Select(pr => new
            {
                Id = pr.Id,
                Rating = pr.Rating,
                Comment = pr.Comment,
                NgayCommemt = pr.NgayCommemt,
                CustomerId = pr.CustomerId,
                CustomerName = pr.Customer?.FullName, // Retrieve customer name
                BookId = pr.BookId,
                // ... include other properties as needed
            });

            return Ok(result);
        }
        [HttpGet("books/averag/{bookId}")]
        public async Task<ActionResult<double>> GetAverageRatingForBook(string bookId)
        {
            // Validate the bookId parameter
            if (string.IsNullOrEmpty(bookId))
            {
                return BadRequest("BookId parameter is required.");
            }

            // Retrieve product reviews based on the provided BookId
            var productReviews = await _context.ProductReviews
                .Where(pr => pr.BookId == bookId)
                .ToListAsync();

            if (productReviews == null || productReviews.Count == 0)
            {
                return NotFound($"No product reviews found for BookId: {bookId}");
            }

            // Calculate the average rating
            var averageRating = productReviews.Average(pr => pr.Rating);

            return Ok(averageRating);
        }
        [HttpGet("books/{bookId}/ratings")]
        public async Task<ActionResult<IEnumerable<object>>> GetRatingCountsForBook(string bookId)
        {
            // Validate the bookId parameter
            if (string.IsNullOrEmpty(bookId))
            {
                return BadRequest("BookId parameter is required.");
            }

            // Retrieve product reviews based on the provided BookId
            var productReviews = await _context.ProductReviews
                .Where(pr => pr.BookId == bookId)
                .ToListAsync();

            if (productReviews == null || productReviews.Count == 0)
            {
                return NotFound($"No product reviews found for BookId: {bookId}");
            }

            // Group product reviews by rating and count the occurrences
            var ratingCounts = productReviews
                .GroupBy(pr => pr.Rating)
                .Select(group => new
                {
                    Rating = group.Key,
                    Count = group.Count()
                })
                .OrderBy(item => item.Rating)
                .ToList();

            return Ok(ratingCounts);
        }
        [HttpGet("outstanding")]
        public async Task<ActionResult<IEnumerable<BookDetailsViewModel>>> GetBookDetailsWithImages(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 1)
        {
            var query = from book in _context.Books
                        join bookDetail in _context.Bookdetails on book.Id equals bookDetail.BookId
                        join bookImg in _context.Bookimgs on book.Id equals bookImg.BookId
                        let averageRating = _context.ProductReviews
                                            .Where(pr => pr.BookId == book.Id)
                                            .Average(pr => pr.Rating)
                        where averageRating == 5
                        select new BookDetailsViewModel
                        {
                            BookId = book.Id,
                            Title = book.Title,
                            AuthorName = book.Author.Name,
                            SupplierName = book.Supplier.Name,
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

            var totalCount = await query.CountAsync();

            var result = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, Data = result });
        }



        // GET: api/ProductReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReview>> GetProductReview(string id)
        {
          if (_context.ProductReviews == null)
          {
              return NotFound();
          }
            var productReview = await _context.ProductReviews.FindAsync(id);

            if (productReview == null)
            {
                return NotFound();
            }

            return productReview;
        }
        [HttpGet("GetBookReview")]
        public async Task<ActionResult<IEnumerable<BookDetailsViewModel>>> GetBookReview(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
        {
            var query = from book in _context.Books
                        join bookDetail in _context.Bookdetails on book.Id equals bookDetail.BookId
                        join bookImg in _context.Bookimgs on book.Id equals bookImg.BookId
                        join productView in _context.ProductReviews on book.Id equals productView.BookId into productViewsGroup
                        from pv in productViewsGroup.DefaultIfEmpty()
                        let averageRating = _context.ProductReviews
                                            .Where(pr => pr.BookId == book.Id)
                                            .Select(pr => (double?)pr.Rating) // Convert to nullable double
                                            .Average() ?? 0 // Default to 0 if there are no reviews
                        select new BookAvgPView
                        {
                            BookId = book.Id,
                            Title = book.Title,
                            AuthorName = book.Author.Name,
                            SupplierName = book.Supplier.Name,
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
                            AverageRating = averageRating, // Include average rating
                            Image0 = book.Bookimg.Image0,
                            Image1 = book.Bookimg.Image1,
                            Image2 = book.Bookimg.Image2,
                            Image3 = book.Bookimg.Image3,
                        };
            var totalCount = await query.CountAsync();

            var result = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { TotalCount = totalCount, Data = result });
        }

        // PUT: api/ProductReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductReview(string id, ProductReview productReview)
        {
            if (id != productReview.Id)
            {
                return BadRequest();
            }

            _context.Entry(productReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductReviewExists(id))
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

        // POST: api/ProductReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductReview>> PostProductReview(ProductReview productReview)
        {
          if (_context.ProductReviews == null)
          {
              return Problem("Entity set 'QLBANSACHContext.ProductReviews'  is null.");
          }
            _context.ProductReviews.Add(productReview);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductReviewExists(productReview.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductReview", new { id = productReview.Id }, productReview);
        }

        // DELETE: api/ProductReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductReview(string id)
        {
            if (_context.ProductReviews == null)
            {
                return NotFound();
            }
            var productReview = await _context.ProductReviews.FindAsync(id);
            if (productReview == null)
            {
                return NotFound();
            }

            _context.ProductReviews.Remove(productReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductReviewExists(string id)
        {
            return (_context.ProductReviews?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
