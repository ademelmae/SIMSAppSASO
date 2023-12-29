using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SIMSApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SampleController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Hello from .NET Web API!";
        }

        [HttpGet("ping")]
        public ActionResult<string> Ping()
        {
            return "Ping successful!";
        }
        
    }
}
