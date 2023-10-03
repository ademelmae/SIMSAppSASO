using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;
using Microsoft.AspNetCore.Http;
namespace SIMSApp.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAPIController: ControllerBase
    {

        private readonly simsdbContext _dbContext;

    public UserAPIController(simsdbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
     [HttpPost("login")]
     public IActionResult Login(Useraccount user)
     {
         // Check if the user exists in the database
         var existingUser = _dbContext.Useraccounts.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

         if (existingUser != null)
         {
             // User is authenticated, perform additional logic if needed
             // For simplicity, returning a success message
              var redirectUrl = "/home/dashboard"; // URL of the desired page
             return Ok(new { redirectUrl });
         }

        return BadRequest("Invalid credentials");
     }

}

}
