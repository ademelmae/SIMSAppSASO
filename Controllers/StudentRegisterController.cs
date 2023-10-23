using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;

namespace SIMSApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentRegisterController : ControllerBase
    {
        private readonly simsdbContext _context;

        public StudentRegisterController(simsdbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student studinfo)
        {
            _context.Students.Add(studinfo);
            await _context.SaveChangesAsync();
            return Ok(studinfo);
        
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<Student>> GetStudentDetails(int studentId)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);

            if (student == null)
            {
                return NotFound(); // Return a 404 if the student is not found
            }

            return student;
        }
     
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Student>>> SearchStudents(string query)
        {
            var students = await _context.Students
                .Where(s => s.Firstname.Contains(query) || s.Middlename.Contains(query) || s.Lastname.Contains(query)|| s.StudentIdNum.Contains(query))
                .ToListAsync();

            return students;
        }


    }
}