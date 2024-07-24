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
    public class AuthorsController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public AuthorsController(QLBANSACHContext context)
        {
            _context = context;
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }

            var authors = await _context.Authors.ToListAsync();

            // Cập nhật đường dẫn hình ảnh tuyệt đối
            foreach (var author in authors)
            {
                if (!string.IsNullOrEmpty(author.Image))
                {
                    author.Image = $"{Request.Scheme}://{Request.Host}{author.Image}";
                }
            }

            return authors;
        }

        // GET: api/Authors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(string id)
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }

            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            // Cập nhật đường dẫn hình ảnh tuyệt đối
            if (!string.IsNullOrEmpty(author.Image))
            {
                author.Image = $"{Request.Scheme}://{Request.Host}{author.Image}";
            }

            return author;
        }

        // PUT: api/Authors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(string id, Author author)
        {
            if (id != author.Id)
            {
                return BadRequest();
            }

            _context.Entry(author).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorExists(id))
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

        // POST: api/Authors
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor([FromForm] AuthorDTO authorDto)
        {
            if (_context.Authors == null)
            {
                return Problem("Entity set 'QLBANSACHContext.Authors' is null.");
            }

            // Generate new Id for Author
            var lastAuthor = await _context.Authors
                                           .OrderByDescending(a => a.Id)
                                           .FirstOrDefaultAsync();

            int newIdNumber = 1;
            if (lastAuthor != null && int.TryParse(lastAuthor.Id.Substring(1), out int lastIdNumber))
            {
                newIdNumber = lastIdNumber + 1;
            }

            var author = new Author
            {
                Id = "A" + newIdNumber.ToString("D3"), // Assuming Id format like A001
                Name = authorDto.name,
                Description = authorDto.description
            };

            if (authorDto.image != null)
            {
                // Save file to wwwroot
                var filePath = Path.Combine("wwwroot/authors", authorDto.image.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await authorDto.image.CopyToAsync(stream);
                }
                author.Image = "/authors/" + authorDto.image.FileName;
            }

            _context.Authors.Add(author);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AuthorExists(author.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAuthor", new { id = author.Id }, author);
        }


        // DELETE: api/Authors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(string id)
        {
            if (_context.Authors == null)
            {
                return NotFound();
            }
            var author = await _context.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuthorExists(string id)
        {
            return (_context.Authors?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
