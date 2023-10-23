using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography; // For password hashing
using System.Text; // For encoding

namespace SIMSApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegisterController : ControllerBase
    {
        private readonly simsdbContext _context;
        private readonly ILogger<UserRegisterController> _logger;

        public UserRegisterController(simsdbContext context, ILogger<UserRegisterController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Useraccount userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (UserExists(userModel.Email))
            {
                return Ok("User already exists");
            }
            
                var userEntity = new Useraccount
            {
                Firstname = userModel.Firstname,
                Lastname = userModel.Lastname,
                Username = userModel.Username,
                Email = userModel.Email,
                Password = HashPassword(userModel.Password) // Hash and salt the password
            };

            _context.Useraccounts.Add(userEntity);
            _context.SaveChanges();

            _logger.LogInformation($"User registered: {userEntity.Email}");

            return Ok(new { Message = "User registered successfully" });
          
            
        }

        private bool UserExists(string email)
        {
            return _context.Useraccounts.Any(u => u.Email == email);
        }

        private string HashPassword(string password)
        {
            // Implement password hashing and salting here (e.g., using PBKDF2)
            using (var sha256 = new SHA256Managed())
            {
                var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }
}
