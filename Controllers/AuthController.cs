using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SIMSApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;


namespace SIMSApp.Controllers
{
    [EnableCors]
    [Route("/api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly simsdbContext _context;

        public AuthController(simsdbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Student>> getstudentdetails()
        {
            return _context.Students.ToList();
        }

        [HttpPost]
        public IActionResult Login([FromBody] Student loginRequest)

        {
            Console.WriteLine($"Received data - StudentIdNum: {loginRequest.StudentIdNum}, Password: {loginRequest.Password}");
            var student = _context.Students
                .FirstOrDefault(s => s.StudentIdNum == loginRequest.StudentIdNum);

            if (student == null || student.Password != loginRequest.Password)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }

            // TODO: You may want to return a token for secure communication
            return Ok(new { message = "Login successful", studentIdNum = student.StudentIdNum });
        }



    }












}