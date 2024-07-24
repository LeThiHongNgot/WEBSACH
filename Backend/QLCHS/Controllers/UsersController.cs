using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLCHS.Entities;
using QLCHS.Helpers;
using QLCHS.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QLCHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QLBANSACHContext _context;

        public UsersController(QLBANSACHContext context)
        {
            _context = context;
        }
        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailOTP emailForm)
        {
            if (!IsValidEmail(emailForm.ToEmail))
            {
                return BadRequest(new { Status = "Invalid email address", Message = "The provided email address is not valid." });
            }

            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("lehongngot17102003@gmail.com", "knnb bxub nlju sidf"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(emailForm.FromEmail),
                    Subject = emailForm.Subject,
                    Body = emailForm.Body,
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(emailForm.ToEmail);

                smtpClient.Send(mailMessage);

                return Ok(new { Status = "Email sent successfully" });
            }
            catch (SmtpException smtpEx)
            {
                return StatusCode(500, new { Status = "SMTP Error", Message = smtpEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = ex.Message });
            }
        }

        [HttpPost("sendOtp")]
        public async Task<IActionResult> SendEmailOtp([FromBody] EmailOTP emailForm)
        {
            if (!IsValidEmail(emailForm.ToEmail))
            {
                return BadRequest(new { Status = "Invalid email address", Message = "The provided email address is not valid." });
            }

            var otpCode = GenerateOtpCode(); // Hàm tạo mã OTP
            var expiresAt = DateTime.UtcNow.AddMinutes(2); // Thời gian hết hạn là 5 phút

            try
            {
                // Tìm kiếm bản ghi OTP hiện có trong cơ sở dữ liệu
                var existingOtp = await _context.Otps.FindAsync(emailForm.ToEmail);

                if (existingOtp != null)
                {
                    // Cập nhật mã OTP và thời gian hết hạn cho bản ghi hiện có
                    existingOtp.Otpcode = otpCode;
                    existingOtp.CreatedAt = DateTime.UtcNow;
                    existingOtp.ExpiresAt = expiresAt;
                    _context.Otps.Update(existingOtp);
                }
                else
                {
                    // Tạo mới bản ghi OTP
                    var otp = new Otp
                    {
                        Email = emailForm.ToEmail,
                        Otpcode = otpCode,
                        CreatedAt = DateTime.UtcNow,
                        ExpiresAt = expiresAt
                    };
                    _context.Otps.Add(otp);
                }

                await _context.SaveChangesAsync();

                // Gửi email OTP
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("lehongngot17102003@gmail.com", "knnb bxub nlju sidf"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(emailForm.FromEmail),
                    Subject = emailForm.Subject,
                    Body = $"Your OTP code is: {otpCode}",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(emailForm.ToEmail);

                await smtpClient.SendMailAsync(mailMessage);

                return Ok(new { Status = "Email sent successfully" });
            }
            catch (SmtpException smtpEx)
            {
                return StatusCode(500, new { Status = "SMTP Error", Message = smtpEx.Message });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(409, new { Status = "Concurrency Error", Message = "The data has been modified or deleted by another process." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = ex.Message });
            }
        }
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var otp = await _context.Otps.FindAsync(request.Email);

            if (otp == null || otp.ExpiresAt < DateTime.UtcNow || otp.Otpcode != request.Otp)
            {
                return BadRequest(new { Status = "Invalid OTP", Message = "The OTP code is invalid or has expired." });
            }

            // OTP hợp lệ, có thể thực hiện các hành động tiếp theo (ví dụ: đăng nhập, thay đổi mật khẩu, v.v.)

            return Ok(new { Status = "OTP verified successfully" });
        }

        private string GenerateOtpCode()
        {
            var random = new Random();
            var otpCode = random.Next(100000, 999999).ToString(); // Sinh mã OTP 6 chữ số
            return otpCode;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpPost("signin/{email}/{password}")]
        public async Task<IActionResult> signin(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = "Invalid request" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null || EncDscPassword.DecryptPassword(user.Password) != password)
            {
                return Unauthorized(new { Message = "Invalid phone number or password" });
            }

            if (user != null && EncDscPassword.DecryptPassword(user.Password) == password)
            {
                // Tạo claims với thông tin cần lưu trong token
                var claims = new[]
                {
            new Claim(ClaimTypes.Name, user.Id),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role) // Thêm claim cho role
        };

                // Khóa bí mật để ký token (có thể lưu trữ trong cấu hình)
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key_here"));

                // Tạo token
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:7009/",
                    audience: "email",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(1),  // Thời gian hết hạn của token
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

                // Mã hóa token thành một chuỗi và trả về trong phản hồi
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Logged In Successfully",
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    Role = user.Role  // Bao gồm role trong phản hồi
                });
            }
            else
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Customer Not Found"
                });
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("updatePassword")]
        public async Task<IActionResult> UpdateCustomerPasswordByEmail([FromBody] UpdatePasswordRequest request)
        {
            // Validate inputs
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(new { Message = "Email or new password cannot be empty." });
            }

            // Find the user by email
            var existingUser = await _context.Users.FirstOrDefaultAsync(c => c.Email == request.Email);

            // Check if the user exists
            if (existingUser == null)
            {
                return NotFound(new { Message = "User not found." });
            }

            // Update the user's password
            existingUser.Password = EncDscPassword.EncryptPassword(request.NewPassword);

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(existingUser.Id))
                {
                    return NotFound(new { Message = "User not found." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new
            {
                StatusCode = 200,
                Message = "Password updated successfully."
            });
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            if (user == null)
            {
                return BadRequest();
            }
            else
            {
                user.Password = EncDscPassword.EncryptPassword(user.Password);
                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Sign Up User Successfully"
                });
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
