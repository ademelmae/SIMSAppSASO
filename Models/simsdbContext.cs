using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SIMSApp.Models
{
    public partial class simsdbContext : DbContext
    {
        public simsdbContext()
        {
        }

        public simsdbContext(DbContextOptions<simsdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Disciplinaryaction> Disciplinaryactions { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Studentviolation> Studentviolations { get; set; }
        public virtual DbSet<Useraccount> Useraccounts { get; set; }
        public virtual DbSet<Violation> Violations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;database=simsdb;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_general_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Disciplinaryaction>(entity =>
            {
                entity.ToTable("disciplinaryaction");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("description");

                entity.Property(e => e.OffenseLevel)
                    .IsRequired()
                    .HasMaxLength(250)
                    .HasColumnName("offenseLevel");

                entity.Property(e => e.ViolationId)
                    .HasColumnType("int(11)")
                    .HasColumnName("violationId");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.ToTable("student");

                entity.Property(e => e.StudentId)
                    .HasColumnType("int(11)")
                    .HasColumnName("studentId");

                entity.Property(e => e.AcademicYear)
                    .HasMaxLength(50)
                    .HasColumnName("academicYear");

                entity.Property(e => e.Age)
                    .HasColumnType("int(11)")
                    .HasColumnName("age");

                entity.Property(e => e.Barangay)
                    .HasMaxLength(250)
                    .HasColumnName("barangay");

                entity.Property(e => e.Birthdate)
                    .HasColumnType("text")
                    .HasColumnName("birthdate");

                entity.Property(e => e.City)
                    .HasMaxLength(250)
                    .HasColumnName("city");

                entity.Property(e => e.Course)
                    .HasMaxLength(250)
                    .HasColumnName("course");

                entity.Property(e => e.Department)
                    .HasMaxLength(250)
                    .HasColumnName("department");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(250)
                    .HasColumnName("firstname");

                entity.Property(e => e.Gender)
                    .HasMaxLength(30)
                    .HasColumnName("gender");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(250)
                    .HasColumnName("lastname");

                entity.Property(e => e.Middlename)
                    .HasMaxLength(250)
                    .HasColumnName("middlename");

                entity.Property(e => e.ParentContact)
                    .HasMaxLength(50)
                    .HasColumnName("parentContact");

                entity.Property(e => e.ParentEmail)
                    .HasMaxLength(250)
                    .HasColumnName("parentEmail");

                entity.Property(e => e.ParentHome)
                    .HasMaxLength(250)
                    .HasColumnName("parentHome");

                entity.Property(e => e.ParentName)
                    .HasMaxLength(250)
                    .HasColumnName("parentName");

                entity.Property(e => e.Password)
                    .HasMaxLength(250)
                    .HasColumnName("password");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .HasColumnName("phone");

                entity.Property(e => e.Province)
                    .HasMaxLength(250)
                    .HasColumnName("province");

                entity.Property(e => e.Street)
                    .HasMaxLength(250)
                    .HasColumnName("street");

                entity.Property(e => e.StudentIdNum)
                    .HasMaxLength(50)
                    .HasColumnName("studentIdNum");

                entity.Property(e => e.YearLevel)
                    .HasMaxLength(250)
                    .HasColumnName("yearLevel");

                entity.Property(e => e.Zip)
                    .HasColumnType("int(11)")
                    .HasColumnName("zip");
            });

            modelBuilder.Entity<Studentviolation>(entity =>
            {
                entity.HasKey(e => e.ViolationId)
                    .HasName("PRIMARY");

                entity.ToTable("studentviolation");

                entity.Property(e => e.ViolationId)
                    .HasColumnType("int(11)")
                    .HasColumnName("violationId");

                entity.Property(e => e.AcademicYear)
                    .HasMaxLength(250)
                    .HasColumnName("academicYear");

                entity.Property(e => e.Course)
                    .HasMaxLength(250)
                    .HasColumnName("course");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.DisciplinaryAction)
                    .HasColumnType("text")
                    .HasColumnName("disciplinaryAction");

                entity.Property(e => e.Location)
                    .HasMaxLength(250)
                    .HasColumnName("location");

                entity.Property(e => e.OffenseLevel)
                    .HasMaxLength(250)
                    .HasColumnName("offenseLevel");

                entity.Property(e => e.OffenseType)
                    .HasMaxLength(250)
                    .HasColumnName("offenseType");

                entity.Property(e => e.ReportingContact)
                    .HasMaxLength(30)
                    .HasColumnName("reportingContact");

                entity.Property(e => e.ReportingName)
                    .HasMaxLength(250)
                    .HasColumnName("reportingName");

                entity.Property(e => e.ReportingRole)
                    .HasMaxLength(250)
                    .HasColumnName("reportingRole");

                entity.Property(e => e.Status)
                    .HasMaxLength(250)
                    .HasColumnName("status");

                entity.Property(e => e.StudentIdNum)
                    .HasMaxLength(250)
                    .HasColumnName("studentIdNum");

                entity.Property(e => e.StudentName)
                    .HasMaxLength(250)
                    .HasColumnName("studentName");

                entity.Property(e => e.ViolationDate)
                    .HasMaxLength(250)
                    .HasColumnName("violationDate");

                entity.Property(e => e.ViolationTime)
                    .HasMaxLength(250)
                    .HasColumnName("violationTime");

                entity.Property(e => e.ViolationType)
                    .HasMaxLength(250)
                    .HasColumnName("violationType");
            });

            modelBuilder.Entity<Useraccount>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("useraccount");

                entity.Property(e => e.UserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("userId");

                entity.Property(e => e.Email)
                    .HasMaxLength(250)
                    .HasColumnName("email");

                entity.Property(e => e.Firstname)
                    .HasMaxLength(250)
                    .HasColumnName("firstname");

                entity.Property(e => e.Lastname)
                    .HasMaxLength(250)
                    .HasColumnName("lastname");

                entity.Property(e => e.Password)
                    .HasMaxLength(250)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasMaxLength(20)
                    .HasColumnName("role");

                entity.Property(e => e.Username)
                    .HasMaxLength(250)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Violation>(entity =>
            {
                entity.ToTable("violation");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.ViolationName)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("violationName");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
