using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SIMSApp.Models;

namespace SIMSApp.Controllers
{
    [ApiController]
    [Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly simsdbContext _context;
    private readonly ILogger<AuthController> _logger;
    public AuthController(simsdbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] Student loginRequest)
    
    {
          _logger.LogInformation("Login attempt for StudentIdNum: {StudentIdNum}", loginRequest.StudentIdNum);

        // Retrieve the student from the database based on StudentIdNum
        var student = _context.Students
            .FirstOrDefault(s => s.StudentIdNum == loginRequest.StudentIdNum);

        if (student == null || student.Password != loginRequest.Password)
        {
            return BadRequest(new { message = "Invalid credentials" });
        }

        // TODO: You may want to return a token for secure communication
        return Ok(new { message = "Login successful" });
    }
}

}