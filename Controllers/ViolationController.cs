using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;

namespace SIMSApp.Controllers{
[ApiController]
[Route("api/[controller]")]
public class ViolationController : ControllerBase
{
    private readonly simsdbContext _context; // Replace 'YourDbContext' with your actual DbContext class.

    public ViolationController(simsdbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult PostViolation([FromBody] Studentviolation studentViolation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Studentviolations.Add(studentViolation);
        _context.SaveChanges();

        return Ok();
    }

    [HttpGet("getViolations")]
    public IActionResult GetViolations()
    {
        var violations = _context.Studentviolations.ToList();
        return Ok(violations);
    }

[HttpGet("getViolations")]
public IActionResult GetViolations(string studentIdNum)
{
    // Assuming 'ViolationType' is a property in your Studentviolation model
    var violations = _context.Studentviolations
        .Where(v => v.StudentIdNum == studentIdNum)
        .Select(v => new
        {
            ViolationType = v.ViolationType,
            Data = v
        })
        .ToList();

    return Ok(violations);
}
        [HttpGet("getViolationsTable")]
        public async Task<ActionResult<IEnumerable<object>>> GetViolationsTable()
        {
            // Projecting only the required fields
            var result = await _context.Studentviolations
                .Select(s => new
                {
                    s.ViolationId,
                    s.StudentName,
                    s.StudentIdNum,
                    s.Course,
                    s.AcademicYear,
                    s.OffenseLevel,
                    s.ViolationType,
                    s.Status
                })
                .ToListAsync();

            return result;
        }


     [HttpDelete("deleteViolation/{id}")]
        public async Task<IActionResult> DeleteViolation(int id)
        {
            try
            {
                var violation = await _context.Studentviolations.FindAsync(id);

                if (violation == null)
                {
                    return NotFound();
                }

                _context.Studentviolations.Remove(violation);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Violation deleted successfully" });
            }
            catch 
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, new { error = "An error occurred while deleting the violation" });
            }
        }

         [HttpGet("{violationId}")]
        public ActionResult<Studentviolation> GetViolation(int violationId)
        {
            var violation = _context.Studentviolations.FirstOrDefault(v  => v.ViolationId == violationId);

            if (violation == null)
            {
                return NotFound();
            }

            return Ok(violation);
        }

        [HttpGet("GetMonthlyReports")]
    public IActionResult GetMonthlyReports(int year, int month)
    {
        // Retrieve all records from the database
        var allReports = _context.Studentviolations.ToList();

        // Filter records in-memory
        var reports = allReports
            .Where(report =>
            {
                DateTime date;
                return DateTime.TryParse(report.ViolationDate, out date) &&
                       date.Year == year &&
                       date.Month == month;
            })
            .ToList();

        return Ok(reports);
    }


        [HttpGet("getViolationDetails")]
        public async Task<ActionResult<Studentviolation>> getViolationDetails(int violationId)
        {
            // Ensure studentId is used in your logic
            var violation = await _context.Studentviolations.FirstOrDefaultAsync(s => s.ViolationId == violationId);

            if (violation == null)
            {
                return NotFound(); 
            }

            return Ok(violation);
        }
    }

       
 


}
