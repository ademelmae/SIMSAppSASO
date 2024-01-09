using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;
namespace SIMSApp.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class StudentController:ControllerBase
    {
        private readonly simsdbContext _context;

        public StudentController(simsdbContext context){
            _context = context;
        }

        [HttpGet]
        public ActionResult<Student> GetStudentDetail([FromQuery] string studentIdNum)
        {
            if (string.IsNullOrEmpty(studentIdNum))
            {
                return BadRequest("StudentIdNum is required.");
            }

            var student = _context.Students.FirstOrDefault(s => s.StudentIdNum == studentIdNum);

            if (student == null)
            {
                return NotFound("No student found with the provided studentIdNum.");
            }

            return Ok(student);
        }
        public ActionResult<List<Student>> getstudentdetails()
        {
            return _context.Students.ToList();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Studentviolation>> GetViolationDetails([FromQuery] string studentIdNum)
        {
            if (string.IsNullOrEmpty(studentIdNum))
            {
                return BadRequest("StudentIdNum is required.");
            }

            var violations = _context.Studentviolations.Where(v => v.StudentIdNum == studentIdNum).ToList();

            if (violations == null || violations.Count == 0)
            {
                return NotFound("No violations found for the provided studentIdNum.");
            }

            return Ok(violations);
        }

       
    }

}