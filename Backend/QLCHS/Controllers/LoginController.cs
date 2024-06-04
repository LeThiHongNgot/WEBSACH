using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using QLCHS.Entities;
using QLCHS.Helpers;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QLCHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly QLBANSACHContext _context;
        public LoginController(QLBANSACHContext context)
        {
            _context = context;
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }
            else
            {
                customer.Password = EncDscPassword.EncryptPassword(customer.Password);
                _context.Customers.Add(customer);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Sign Up Successfully"
                });
            }
        }
        [HttpPost("signin/{phone}/{password}")]
        public async Task<IActionResult> signin(string phone, string password)
        {
            if (string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password))
            {
                return BadRequest(new { Message = "Invalid request" });
            }

            var user = await _context.Customers.FirstOrDefaultAsync(x => x.Phone == phone);

            if (user == null || EncDscPassword.DecryptPassword(user.Password) != password)
            {
                return Unauthorized(new { Message = "Invalid phone number or password" });
            }

            if (user != null && EncDscPassword.DecryptPassword(user.Password) == password)
            {
                // Tạo claims với thông tin cần lưu trong token
                var claims = new[]
                {
                 new Claim(ClaimTypes.Name,  user.Id),
                 new Claim(ClaimTypes.NameIdentifier,  user.Id.ToString())
                 // Thêm các claims khác nếu cần
             };

                // Khóa bí mật để ký token (có thể lưu trữ trong cấu hình)
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("https://localhost:7009/"));

                // Tạo token
                var token = new JwtSecurityToken(
                    issuer: "https://localhost:7009/",
                    audience: "phone",
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(1),  // Thời gian hết hạn của token
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

                // Mã hóa token thành một chuỗi và trả về trong phản hồi
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Logged In Successfully",
                    Token = new JwtSecurityTokenHandler().WriteToken(token)
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

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(Customer customer)
        {
            if (customer == null)
            {
                return BadRequest();
            }
            else
            {
                var user = await _context.Customers.FirstOrDefaultAsync(x => x.Phone == customer.Phone);
                if (user == null)
                {
                    return NotFound(new { Message = "User not found!" });
                }
                if (user != null && EncDscPassword.DecryptPassword(user.Password) == customer.Password)
                {
                    // Tạo claims với thông tin cần lưu trong token
                    var claims = new[]
                    {
                 new Claim(ClaimTypes.Name,  user.Id),
                 new Claim(ClaimTypes.NameIdentifier,  user.Id.ToString())
                 // Thêm các claims khác nếu cần
             };

                    // Khóa bí mật để ký token (có thể lưu trữ trong cấu hình)
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("https://localhost:7009/"));

                    // Tạo token
                    var token = new JwtSecurityToken(
                        issuer: "https://localhost:7009/",
                        audience: "phone",
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(1),  // Thời gian hết hạn của token
                        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                    );

                    // Mã hóa token thành một chuỗi và trả về trong phản hồi
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully",
                        Token = new JwtSecurityTokenHandler().WriteToken(token)
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
        }
        [HttpPut("update/{customerId}")]
        public async Task<IActionResult> UpdateCustomer(string customerId, [FromBody] Customer updatedCustomer)
        {
            if (updatedCustomer == null || updatedCustomer.Id != customerId)
            {
                return BadRequest();
            }

            var existingCustomer = _context.Customers.Find(customerId);

            if (existingCustomer == null )
            {
                return NotFound();
            }
            existingCustomer.Password = EncDscPassword.EncryptPassword(updatedCustomer.Password);

            _context.SaveChanges();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Customer Updated Successfully"
            });
        }
        [HttpPut("updatePassword/{phoneNumber}/{passNew}")]
        public async Task<IActionResult> UpdateCustomerPasswordByPhone(string phoneNumber, string passNew)
        {
            // Check if phoneNumber or passNew is null or empty (you may want to add additional validation as needed)
            if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(passNew))
            {
                return BadRequest();
            }

            var existingCustomer = _context.Customers.FirstOrDefault(c => c.Phone == phoneNumber);

            if (existingCustomer == null)
            {
                return NotFound();
            }

            existingCustomer.Password = EncDscPassword.EncryptPassword(passNew);

            _context.SaveChanges();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Password Updated Successfully"
            });
        }

        [HttpGet("VerifyPassword/{phone}/{password}")]
        public IActionResult VerifyPassword(string phone, string password)
        {
            // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên số điện thoại
            var user = _context.Customers.FirstOrDefault(x => x.Phone == phone);

            if (user == null)
            {
                return NotFound(new { Message = "User not found!" });
            }

            // Kiểm tra xem mật khẩu đã nhập có khớp với mật khẩu đã mã hóa hay không
            bool isPasswordMatch = EncDscPassword.DecryptPassword(user.Password) == password;

            if (isPasswordMatch)
            {
                return Ok(new { Message = "Password is correct!" });
            }
            else
            {
                return BadRequest(new { Message = "Incorrect password!" });
            }
        }
        

    }
}
