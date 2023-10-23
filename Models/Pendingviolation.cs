using System;
using System.Collections.Generic;

namespace SIMSApp.Models
{
    public partial class Pendingviolation
    {
        public int Id { get; set; }
        public string StudentName { get; set; }
        public string ViolationType { get; set; }
        public string ViolationDate { get; set; }
        public bool? IsApproved { get; set; }
    }
}
