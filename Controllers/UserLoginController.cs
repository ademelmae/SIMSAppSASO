using System;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using SIMSApp.Models;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class UserLoginController : ControllerBase
{
    private readonly simsdbContext _context;

    public UserLoginController(simsdbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Useraccount request)
    {
        try
        {
            // Find the user by their username or email
            var user = _context.Useraccounts.FirstOrDefault(u =>
                (u.Username == request.Username || u.Email == request.Username)
            );

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Hash the password from the login request
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(request.Password);
                byte[] hashBytes = sha256.ComputeHash(bytes);
                string hashedPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

                // Compare the hashed password from the request with the stored hashed password
                if (user.Password == hashedPassword)
                {
                    // Passwords match, user is authenticated
                    // You can generate a JWT token here and return it for authentication
                    // For simplicity, I'm returning a success message
                    return Ok("Login successful");
                }
                else
                {
                    // Passwords do not match
                    return Unauthorized("Incorrect password");
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Login failed", Error = ex.Message });
        }
    }
}
