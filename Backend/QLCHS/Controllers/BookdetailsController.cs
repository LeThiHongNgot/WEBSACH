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
    public class BookdetailsController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public BookdetailsController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Bookdetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookdetail>>> GetBookdetails()
        {
          if (_context.Bookdetails == null)
          {
              return NotFound();
          }
            return await _context.Bookdetails.ToListAsync();
        }

        // GET: api/Bookdetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bookdetail>> GetBookdetail(string id)
        {
          if (_context.Bookdetails == null)
          {
              return NotFound();
          }
            var bookdetail = await _context.Bookdetails.FindAsync(id);

            if (bookdetail == null)
            {
                return NotFound();
            }

            return bookdetail;
        }

        // PUT: api/Bookdetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookdetail(string id, Bookdetail bookdetail)
        {
            if (id != bookdetail.BookId)
            {
                return BadRequest();
            }

            _context.Entry(bookdetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookdetailExists(id))
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

        // POST: api/Bookdetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bookdetail>> PostBookdetail(Bookdetail bookdetail)
        {
          if (_context.Bookdetails == null)
          {
              return Problem("Entity set 'QLBANSACHContext.Bookdetails'  is null.");
          }
            _context.Bookdetails.Add(bookdetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookdetailExists(bookdetail.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookdetail", new { id = bookdetail.BookId }, bookdetail);
        }

        // DELETE: api/Bookdetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookdetail(string id)
        {
            if (_context.Bookdetails == null)
            {
                return NotFound();
            }
            var bookdetail = await _context.Bookdetails.FindAsync(id);
            if (bookdetail == null)
            {
                return NotFound();
            }

            _context.Bookdetails.Remove(bookdetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("ByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Bookdetail>>> GetBookdetailsByCategory(
         string categoryId,
            [FromQuery] int? page = 1,
            [FromQuery] int? pageSize = 10)
        {
            if (!_context.Bookdetails.Any())
            {
                return NotFound();
            }

            var bookdetails = _context.Bookdetails
                .Where(b => b.CategoryId == categoryId);

            int actualPage = page ?? 1; // Use provided page or default to 1
            int actualPageSize = pageSize ?? 10; // Use provided pageSize or default to 10

            var paginatedBookdetails = await bookdetails
                .OrderBy(b => b.BookId)
                .Skip((actualPage - 1) * actualPageSize)
                .Take(actualPageSize)
                .ToListAsync();

            return paginatedBookdetails;
        }

        private bool BookdetailExists(string id)
        {
            return (_context.Bookdetails?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
    }
}
