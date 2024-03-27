jQuery(document).ready(function ($) {
  const role = sessionStorage.getItem("Role");
  console.log(role);
  if (role === "staff") {
      // Hide the register button for faculty
      document.getElementById("registerButton").style.display = "none";
  }
  fetch("/api/studentregister/getstudentdata")
      .then(response => response.json())
      .then(data => {
          var tableBody = $("#studentTableBody");
          tableBody.empty();

          data.forEach(function (item) {
              var row = $("<tr></tr>");

              // Add columns to the row
              for (var key in item) {
                  if (key !== "studentId") {
                      var cell = $("<td></td>").text(item[key]);
                      row.append(cell);
                  }
              }

              tableBody.append(row);
          });

          // DataTable initialization
          if ($.fn.DataTable) {
              $('#studentTable').DataTable({
                  "paging": true,
                  "ordering": true,
                  "info": true,
                  // Add additional DataTable options as needed
              });
          } else {
              console.error("DataTables not loaded!");
          }
      })
      .catch(error => console.error("Error fetching data:", error));
});
$(document).ready(function() {
  $('#studentForm').submit(function(e) {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to register student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        submitForm();
      }
    });
  });

  function submitForm() {
    const studentData = {
      Firstname: $("#firstname").val(),
      Middlename: $("#middlename").val(),
      Lastname: $("#lastname").val(),
      Birthdate: $("#dob").val(),
      Age: parseInt($("#age").val()),
      Gender: $("#gender").val(),
      Phone: $("#phone").val().toString(),
      Email: $("#emailadd").val(),
      Province: $("#province").val(),
      City: $("#city").val(),
      Barangay: $("#barangay").val(),
      Street: $("#streetAddress").val(),
      Zip: $("#zipCode").val(),
      AcademicYear: $("#academicYear").val(),
      StudentIdNum: $("#studentidnum").val().toString(),
      Department: $("#departmentSelect").val(),
      Course: $("#courseSelect").val(),
      YearLevel: $("#yearSelect").val(),
      ParentName: $("#parentName").val(),
      ParentContact: $("#parentContact").val().toString(),
      ParentEmail: $("#parentEmail").val(),
      ParentHome: $("#parentHome").val()
    };

    fetch('/api/studentregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => Promise.reject(data.Message));
        }
      })
      .then(studentData => {
        console.log('Registered student successfully:', studentData);

        Swal.fire({
          title: "Success",
          text: "Student registered successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        });

        document.getElementById('studentForm').reset();

      })
      .catch(error => {
        console.error('Response Data:', error);

        if (error && error.Message) {
          console.log('Server error message:', error.Message); // Log the server error message
          Swal.fire({
            title: "Error",
            text: error.Message,
            icon: "error"
          });
        } else {
          console.log('An error occurred while submitting the student data.'); // Log a generic error message
          alert('An error occurred while submitting the student data. Please check the console for more details.');
        }


        if (error === 'StudentIdNum already exists') {
          Swal.fire({
            title: "Error",
            text: "StudentIdNum already exists!",
            icon: "error"
          });
        } else if (error === 'Student already exists') {
          Swal.fire({
            title: "Error",
            text: "Student already exists!",
            icon: "error"
          });
        } else {
          alert('An error occurred while submitting the student data.');
        }
      });
  }
});



