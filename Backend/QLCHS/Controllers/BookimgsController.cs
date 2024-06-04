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
    public class BookimgsController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public BookimgsController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Bookimgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bookimg>>> GetBookimgs()
        {
          if (_context.Bookimgs == null)
          {
              return NotFound();
          }
            return await _context.Bookimgs.ToListAsync();
        }

        // GET: api/Bookimgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bookimg>> GetBookimg(string id)
        {
          if (_context.Bookimgs == null)
          {
              return NotFound();
          }
            var bookimg = await _context.Bookimgs.FindAsync(id);

            if (bookimg == null)
            {
                return NotFound();
            }

            return bookimg;
        }

        // PUT: api/Bookimgs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookimg(string id, Bookimg bookimg)
        {
            if (id != bookimg.BookId)
            {
                return BadRequest();
            }

            _context.Entry(bookimg).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookimgExists(id))
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

        // POST: api/Bookimgs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bookimg>> PostBookimg(Bookimg bookimg)
        {
          if (_context.Bookimgs == null)
          {
              return Problem("Entity set 'QLBANSACHContext.Bookimgs'  is null.");
          }
            _context.Bookimgs.Add(bookimg);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookimgExists(bookimg.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookimg", new { id = bookimg.BookId }, bookimg);
        }

        // DELETE: api/Bookimgs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookimg(string id)
        {
            if (_context.Bookimgs == null)
            {
                return NotFound();
            }
            var bookimg = await _context.Bookimgs.FindAsync(id);
            if (bookimg == null)
            {
                return NotFound();
            }

            _context.Bookimgs.Remove(bookimg);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookimgExists(string id)
        {
            return (_context.Bookimgs?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
    }
}
