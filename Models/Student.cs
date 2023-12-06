using System;
using System.Collections.Generic;

namespace SIMSApp.Models
{
    public partial class Student
    {
        public int StudentId { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public string Birthdate { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Province { get; set; }
        public string City { get; set; }
        public string Barangay { get; set; }
        public string Street { get; set; }
        public int Zip { get; set; }
        public string StudentIdNum { get; set; }
        public string Department { get; set; }
        public string Course { get; set; }
        public string ParentName { get; set; }
        public string ParentEmail { get; set; }
        public string ParentHome { get; set; }
        public string ParentContact { get; set; }
        public string YearLevel { get; set; }
        public string AcademicYear { get; set; }
    }
}
