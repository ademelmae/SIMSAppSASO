using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMSApp.Models;

namespace SIMSApp.Controllers
{
     [Route("api/violations")]
    [ApiController]
    public class ViolationsController : ControllerBase
    {
        private readonly simsdbContext _context;

    public ViolationsController(simsdbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateViolation([FromBody] Pendingviolation violation)
    {
        try
        {
            if (violation.IsApproved.HasValue && violation.IsApproved.Value)
            {
                var approvedViolation = new Approvedviolation
                {
                    StudentName = violation.StudentName,
                    ViolationType = violation.ViolationType,
                    ViolationDate = violation.ViolationDate,
                };
                _context.Approvedviolations.Add(approvedViolation);
            }
            else
            {
                _context.Pendingviolations.Add(violation);
            }

            await _context.SaveChangesAsync();

            return Ok("Violation created successfully.");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error: {ex.Message}");
        }
    }
    }

}
