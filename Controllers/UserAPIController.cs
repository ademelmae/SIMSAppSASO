using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SIMSApp.Models; // Replace with your actual namespace
using Microsoft.AspNetCore.Authorization;
using SIMSApp.Repositories;

namespace SIMSApp.Controllers
{
    [Route("api/UserAPI")]
    [ApiController]
    public class UserAPIController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
                private static readonly HashSet<string> InvalidTokens = new HashSet<string>();

        private readonly IConfiguration _configuration; // declare to inject IConfiguration

        public UserAPIController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration; // Inject IConfiguration
        }

       [HttpPost("login")]
        public IActionResult Login([FromBody] Useraccount user)
        {
            var authenticatedUser = _userRepository.AuthenticateUser(user.Username, user.Password);

            if (authenticatedUser == null)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(authenticatedUser);

            // Check if the generated token is in the list of invalidated tokens
            if (InvalidTokens.Contains(token))
            {
                // If the token is invalidated, return Unauthorized
                return Unauthorized();
            }

            return Ok(new { Token = token });
        }
        
        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Invalidate the current token
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            InvalidTokens.Add(token);

            return Ok("Logged out successfully");
        }

        // Generate JWT Token method
        private string GenerateJwtToken(Useraccount user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                // Add any additional claims here as needed
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Token expiration time
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
