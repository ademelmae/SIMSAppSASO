using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;

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
                    s.YearLevel,
                    s.OffenseLevel,
                    s.ViolationType,
                    s.Status
                })
                .ToListAsync();

            return result;
        }

     [HttpGet("getviolationdetails")]
        public async Task<ActionResult<Studentviolation>> GetViolationDetails(int violationId)
        {
            // Ensure studentId is used in your logic
            var violation = await _context.Studentviolations.FirstOrDefaultAsync(s => s.ViolationId == violationId);

            if (violation == null)
            {
                return NotFound(); // Return a 404 if the student is not found
            }

            return Ok(violation);
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

    private bool ViolationExists(int id)
    {
        return _context.Studentviolations.Any(e => e.ViolationId == id);
    }


}