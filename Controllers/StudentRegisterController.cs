using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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
            try
            {
                var existingStudentIdNum = _context.Students.FirstOrDefault(s => s.StudentIdNum == studinfo.StudentIdNum);
                if (existingStudentIdNum != null)
                {
                    return Conflict(new { Message = "StudentIdNum already exists" });
                }

                var existingStudent = _context.Students.FirstOrDefault(s =>
                    s.Firstname == studinfo.Firstname &&
                    s.Middlename == studinfo.Middlename &&
                    s.Lastname == studinfo.Lastname);

                if (existingStudent != null)
                {
                    return Conflict(new { Message = "Student already exists" });
                }

                // Generate a random password
                studinfo.Password = GenerateRandomPassword();

                _context.Students.Add(studinfo);
                await _context.SaveChangesAsync();

                return Ok(studinfo);
            }


            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the student.");
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
            var student = await _context.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);

            if (student == null)
            {
                return NotFound();
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
                // Check if there's another student with the same ID number
                var existingStudentIdNum = await _context.Students.FirstOrDefaultAsync(s => s.StudentIdNum == updatedStudent.StudentIdNum && s.StudentId != id);
                if (existingStudentIdNum != null)
                {
                    return Conflict(new { Message = "StudentIdNum already exists" });
                }

                // Check if there's another student with the same name
                var existingStudentDuplicate = await _context.Students.FirstOrDefaultAsync(s =>
                    s.Firstname == updatedStudent.Firstname &&
                    s.Middlename == updatedStudent.Middlename &&
                    s.Lastname == updatedStudent.Lastname &&
                    s.StudentId != id);

                if (existingStudentDuplicate != null)
                {
                    return Conflict(new { Message = "Student already exists" });
                }

                // Find the existing student to update
                var existingStudent = await _context.Students.FindAsync(id);
                if (existingStudent == null)
                {
                    return NotFound($"Student with ID {id} not found.");
                }

                // Update the existing student
                _context.Entry(existingStudent).CurrentValues.SetValues(updatedStudent);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Student updated successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception
                // _logger.LogError($"Error updating student data: {ex}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the student.");
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
                return StatusCode(500, new { error = "An error occurred while deleting the student" });
            }
        }

    }
}