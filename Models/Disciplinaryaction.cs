using System;
using System.Collections.Generic;

namespace SIMSApp.Models
{
    public partial class Disciplinaryaction
    {
        public int Id { get; set; }
        public int ViolationId { get; set; }
        public string OffenseLevel { get; set; }
        public string Description { get; set; }
    }
}
