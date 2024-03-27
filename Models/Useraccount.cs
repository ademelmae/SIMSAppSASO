using System;
using System.Collections.Generic;

namespace SIMSApp.Models
{
    public partial class Useraccount
    {
        public int UserId { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string Username { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
