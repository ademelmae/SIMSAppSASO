using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SIMSApp.Models;

namespace SIMSApp.Controllers
{
    [Route("api/count")]
    [ApiController]
    public class CountController : ControllerBase
    {
        private readonly simsdbContext _context;

    public CountController(simsdbContext context)
    {
        _context = context;
    }

    [HttpGet("studentCount")]
    public IActionResult GetStudentCount()
    {
        int studentCount = _context.Students.Count();
        return Ok(studentCount);
    }

    [HttpGet("violationCount")]
    public IActionResult GetPendingViolationCount()
    {
        int pendingViolationCount = _context.Studentviolations.Count(v => v.Status == "pending");
        return Ok(pendingViolationCount);
    }

    [HttpGet("approvedCount")]
    public IActionResult GetApprovedViolationCount()
    {
        int approvedViolationCount = _context.Studentviolations.Count(v => v.Status == "approved");
        return Ok(approvedViolationCount);
    }

    }
}