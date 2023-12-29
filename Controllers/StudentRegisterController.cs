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
        var existingStudent = _context.Students.FirstOrDefault(s =>
            s.Firstname == studinfo.Firstname &&
            s.Middlename == studinfo.Middlename &&
            s.Lastname == studinfo.Lastname);

        if (existingStudent != null)
        {
            // Student already exists, return a specific status code and message
            return Conflict(new { Message = "Student already exists" });
        }
        else
        {
            // Generate a random password
            studinfo.Password = GenerateRandomPassword();

            // Save the student with the generated password
            _context.Students.Add(studinfo);
            await _context.SaveChangesAsync();

            // Return the student object with the generated password
            return Ok(studinfo);
        }
    }

        private string GenerateRandomPassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const int passwordLength = 8;

            Random random = new Random();
            char[] passwordArray = new char[passwordLength];

            for (int i = 0; i < passwordLength; i++)
            {
                passwordArray[i] = chars[random.Next(chars.Length)];
            }

            return new string(passwordArray);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("getstudentdetails")]
        public async Task<ActionResult<Student>> GetStudentDetails(int studentId)
        {
            // Ensure studentId is used in your logic
            var student = await _context.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);

            if (student == null)
            {
                return NotFound(); // Return a 404 if the student is not found
            }

            return Ok(student);
        }

        [HttpGet("autocomplete")]
        public async Task<IActionResult> Autocomplete(string searchTerm)
        {
            var students = _context.Students
                .Where(s => s.Firstname.Contains(searchTerm) || s.Middlename.Contains(searchTerm))
                .Select(s => new { s.Firstname, s.Middlename, s.Lastname, s.StudentIdNum, s.Department, s.Course, s.AcademicYear })
                .ToList();

            return Ok(students);
        }

        [HttpGet("getstudentdata")]
        public async Task<ActionResult<IEnumerable<object>>> GetStudentData()
        {
            // Projecting only the required fields
            var result = await _context.Students
                .Select(s => new
                {
                    s.StudentId,
                    s.Firstname,
                    s.Middlename,
                    s.Lastname,
                    s.Department,
                    s.Course,
                    s.YearLevel,
                    s.AcademicYear
                })
                .ToListAsync();

            return result;
        }


        [HttpPut("updatestudent/{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student updatedStudent)
        {
            try
            {
                var existingStudent = await _context.Students.FindAsync(id);

                if (existingStudent == null)
                {
                    return NotFound($"Student with ID {id} not found.");
                }

                // Update properties based on the provided data
                existingStudent.StudentIdNum = updatedStudent.StudentIdNum;
                existingStudent.Firstname = updatedStudent.Firstname;
                existingStudent.Middlename = updatedStudent.Middlename;
                existingStudent.Lastname = updatedStudent.Lastname;
                existingStudent.Birthdate = updatedStudent.Birthdate;
                existingStudent.Age = updatedStudent.Age;
                existingStudent.Gender = updatedStudent.Gender;
                existingStudent.Phone = updatedStudent.Phone;
                existingStudent.Email = updatedStudent.Email;
                existingStudent.Province = updatedStudent.Province;
                existingStudent.City = updatedStudent.City;
                existingStudent.Barangay = updatedStudent.Barangay;
                existingStudent.Street = updatedStudent.Street;
                existingStudent.Zip = updatedStudent.Zip;
                existingStudent.AcademicYear = updatedStudent.AcademicYear;
                existingStudent.Department = updatedStudent.Department;
                existingStudent.Course = updatedStudent.Course;
                existingStudent.YearLevel = updatedStudent.YearLevel;
                existingStudent.ParentName = updatedStudent.ParentName;
                existingStudent.ParentHome = updatedStudent.ParentHome;
                existingStudent.ParentContact = updatedStudent.ParentContact;
                existingStudent.ParentEmail = updatedStudent.ParentEmail;
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating student data: {ex.Message}");
            }
        }

        [HttpGet("{studentId}")]
        public ActionResult<Student> GetStudent(int studentId)
        {
            var student = _context.Students.FirstOrDefault(s => s.StudentId == studentId);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        [HttpDelete("deleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            try
            {
                var student = await _context.Students.FindAsync(id);

                if (student == null)
                {
                    return NotFound();
                }

                _context.Students.Remove(student);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Student deleted successfully" });
            }
            catch 
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, new { error = "An error occurred while deleting the student" });
            }
        }
      
    }
}