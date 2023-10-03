using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;
using System;
using System.Threading.Tasks;

[Route("api/StudentViolation")]
public class StudentViolationController : ControllerBase
{
    private readonly simsdbContext _dbContext;

    public StudentViolationController(simsdbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] Pendingviolation formData)
    {
        try
        {
            if (ModelState.IsValid)
            {
                // Add the form data to the database
                _dbContext.Pendingviolations.Add(formData);
                await _dbContext.SaveChangesAsync();

                return Ok(new { success = true, message = "Form submission successful" });
            }
            else
            {
                return BadRequest(new { success = false, message = "Form submission failed", errors = ModelState.Values });
            }
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = "Form submission failed", error = ex.Message });
        }
    }
}