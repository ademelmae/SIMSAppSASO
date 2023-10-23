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

    [HttpGet("pendingViolationCount")]
    public IActionResult GetPendingViolationCount()
    {
        int pendingViolationCount = _context.Pendingviolations.Count();
        return Ok(pendingViolationCount);
    }

    [HttpGet("approvedViolationCount")]
    public IActionResult GetApprovedViolationCount()
    {
        int approvedViolationCount = _context.Approvedviolations.Count();
        return Ok(approvedViolationCount);
    }

    }
}