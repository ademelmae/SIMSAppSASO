using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SIMSApp.Models;

namespace SIMSApp.Controllers;


public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }
      public IActionResult Dashboard()
    {
        return View();
    }
    public IActionResult Privacy()
    {
        return View();
    }

     public IActionResult Violation()
    {
        return View();
    }
     public IActionResult StudentList()
    {
        return View();
    }
    public IActionResult Reports()
    {
        return View();
    }
   
    public IActionResult RegisterStudent()
    {
        return View();
    }

    public IActionResult SearchStudent()
    {
        return View();
    }

    public IActionResult addviolationform()
    {
        return View();
    }

    public IActionResult admindash()
    {
        return View();
    }

    public IActionResult sidebar()
    {
        return View();
    }

    public IActionResult Login()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
