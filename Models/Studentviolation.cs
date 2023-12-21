using System;
using System.Collections.Generic;

namespace SIMSApp.Models
{
    public partial class Studentviolation
    {
        public int ViolationId { get; set; }
        public string StudentName { get; set; }
        public string StudentIdNum { get; set; }
        public string Course { get; set; }
        public string AcademicYear { get; set; }
        public string ViolationType { get; set; }
        public string ViolationDate { get; set; }
        public string ViolationTime { get; set; }
        public string OffenseLevel { get; set; }
        public string DisciplinaryAction { get; set; }
        public string OffenseType { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Attachment { get; set; }
        public string ReportingName { get; set; }
        public string ReportingRole { get; set; }
        public string ReportingContact { get; set; }
        public string Status { get; set; }
    }
}
