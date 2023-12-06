using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;

[Route("api/[controller]")]
[ApiController]
public class UserRegisterController : ControllerBase
{
    private readonly simsdbContext _context;

    public UserRegisterController(simsdbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] Useraccount request)
    {
        try
        {
            var existingUser = _context.Useraccounts.FirstOrDefault(u => u.Username == request.Username);

            if (existingUser != null)
            {
                return Ok("User already exists");
            }

            // Hash the password using SHA-256
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(request.Password);
                byte[] hashBytes = sha256.ComputeHash(bytes);
                string hashedPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                
                // Create a new user entity
                var newUser = new Useraccount
                {
                    Firstname = request.Firstname,
                    Lastname = request.Lastname,
                    Username = request.Username,
                    Email = request.Email,
                    Password = hashedPassword
                };

                _context.Useraccounts.Add(newUser);
                _context.SaveChanges();
            }

            return Ok("User registered successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Registration failed", Error = ex.Message });
        }
    }
}
