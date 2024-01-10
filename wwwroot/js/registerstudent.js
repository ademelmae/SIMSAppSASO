

jQuery(document).ready(function ($) {
 
  
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

              var actionCell = $("<td class='text-center' style='width: 170px;'></td>");

              //InfoButton
              var infoButton = $("<button></button>")
                  .addClass("btn btn-info btn-sm mr-1") 
                  .css({
                    display: "inline-block",
                    margin: "",
                    background:""
                  })
                  .html('<i class="fas fa-info-circle"></i>')
                  .on("click", function () {
                    var studentId = item.studentId;
                    sessionStorage.setItem("studentId", studentId);
                    
                    // Redirect to another view
                    window.location.href = "/Home/ViewStudentInfo";
                  
                      

                });
              actionCell.append(infoButton);

              var updateButton = $("<button></button>")
                  .addClass("btn btn-warning btn-sm mr-1") 
                  .css({
                    display: "inline-block"
                  })
                  .html('<i class="fas fa-edit"></i>')
                  .on("click", function () {
            
                    var studentId = item.studentId;
                    sessionStorage.setItem("studentId", studentId);
                    
                    // Redirect to another view
                    window.location.href = "/Home/UpdateStudent";
                  });

              actionCell.append(updateButton);

              var deleteButton = $("<button></button>")
              .addClass("btn btn-danger btn-sm") 
              .css({
                display: "inline-block",
                margin: "2px",
                background:""
              }) .html('<i class="fas fa-trash-alt"></i>')
                  .on("click", function () {
                    var studentId = item.studentId;

                    Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to delete this student?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Delete",
                    }).then((willDelete) => {
                        if (willDelete.isConfirmed) {
                            // Send a DELETE request to the server to delete the student
                            fetch("/api/studentregister/deleteStudent/" + studentId, {
                                method: "DELETE",
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error("Network response was not ok");
                                    }
                                    return response.json();
                                })
                                .then(deleteResponse => {
                                    // Handle success, e.g., show a success message to the user
                                    console.log('Deleted student successfully:', deleteResponse);
            
                                    Swal.fire({
                                        title: "Success",
                                        text: "Student deleted successfully!",
                                        icon: "success",
                                        timer: 3000,
                                        showConfirmButton: true
                                    });
            
                                    // Optionally, remove the deleted row from the table
                                    row.remove();
                                })
                                .catch(error => {
                                    // Handle errors, e.g., display an error message to the user
                                    console.error('Error deleting student:', error);
                                    alert('An error occurred while deleting the student.');
                                });
                        }
                    });
                  });
              actionCell.append(deleteButton);

              row.append(actionCell);
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


$('#studentForm').submit(function (e) {
    e.preventDefault();
  
    // Check if any required field is empty
    if (!validateForm()) {
        return;
    }
  
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to register student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Submit",
    }).then((willSubmit) => {
        if (willSubmit.isConfirmed) {
            submitForm();
        }
    });
  });
  
  function validateForm() {
    const requiredFields = [
      { id: "firstname", label: "First Name" },
      { id: "middlename", label: "Middle Name" },
      { id: "lastname", label: "Last Name" },
      { id: "dob", label: "Date of Birth" },
      { id: "age", label: "Age" },
      { id: "gender", label: "Gender" },
      { id: "phone", label: "Phone" },
      { id: "emailadd", label: "Email" },
      { id: "province", label: "Province" },
      { id: "city", label: "City" },
      { id: "barangay", label: "Barangay" },
      { id: "streetAddress", label: "Street Address" },
      { id: "zipCode", label: "Zip Code" },
      { id: "academicYear", label: "Academic Year" },
      { id: "studentidnum", label: "Student ID Number" },
      { id: "departmentSelect", label: "Select Department" },
      { id: "courseSelect", label: "Select Course" },
      { id: "yearSelect", label: "Select Year" },
      { id: "parentName", label: "Name of Parent" },
      { id: "parentContact", label: "Phone Number of Parent" },
      { id: "parentEmail", label: "Email Address of Parent" },
      { id: "parentHome", label: "Home Address of Parent" },

    ];
  
    let anyFieldFilled = false;
    let missingFields = [];
  
    for (const field of requiredFields) {
      const value = document.getElementById(field.id).value.trim();
      if (value !== "") {
        anyFieldFilled = true;
      } else {
        // Collect missing field
        missingFields.push(field.label);
      }
    }
  
    if (!anyFieldFilled) {
      // Display error message if all fields are empty
      Swal.fire({
        title: "Error",
        text: "All fields are empty. Please fill in at least one field.",
        icon: "error"
      });
      return false;
    }
  
    if (missingFields.length > 0) {
      // Display error message for each missing field
      Swal.fire({
        title: "Error",
        html: `Please fill in the following field(s):<br>${missingFields.join('<br>')}`,
        icon: "error"
      });
      return false;
    }
  
    return true; // All required fields are filled
  }
  
  
    function submitForm(){
      const studentData = {
        FirstName: document.getElementById("firstname").value,
        MiddleName: document.getElementById("middlename").value,
        LastName: document.getElementById("lastname").value,
        Birthdate: document.getElementById("dob").value,
        Age: parseInt(document.getElementById("age").value),
        Gender: document.getElementById("gender").value,     
        Phone :  document.getElementById("phone").value.toString(),
        Email: document.getElementById("emailadd").value,
        Province: document.getElementById("province").value,
        City: document.getElementById("city").value,
        Barangay: document.getElementById("barangay").value,
        Street: document.getElementById("streetAddress").value,
        Zip: document.getElementById("zipCode").value,
        AcademicYear: document.getElementById("academicYear").value,
        StudentIdNum: document.getElementById("studentidnum").value.toString(),
        Department: document.getElementById("departmentSelect").value,
        Course: document.getElementById("courseSelect").value,
        YearLevel: document.getElementById("yearSelect").value,
        ParentName: document.getElementById("parentName").value,
        ParentContact: document.getElementById("parentContact").value.toString(),
        ParentEmail: document.getElementById("parentEmail").value,
        ParentHome: document.getElementById("parentHome").value,  
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
      // Handle success, e.g., show a success message to the user
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
      // Handle errors, e.g., display an error message to the user
      console.error('Error:', error);

      if (error === 'StudentIdNum already exists') {
          // Display SweetAlert for existing StudentIdNum
          Swal.fire({
              title: "Error",
              text: "StudentIdNum already exists!",
              icon: "error"
          });
      } else if (error === 'Student already exists') {
          // Display SweetAlert for existing student
          Swal.fire({
              title: "Error",
              text: "Student already exists!",
              icon: "error"
          });
      } else {
          // Display a generic error message
          alert('An error occurred while submitting the student data.');
      }
  });
    }


function calculateAge() {    
    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");

    // Get the selected date from the input field
    const selectedDate = new Date(dobInput.value);

    // Calculate the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - selectedDate.getFullYear();

    // Check if the birthdate has occurred this year or not
    if (
        currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getDate() < selectedDate.getDate())
    ) {
        age--;
    }

    // Update the age input field
    ageInput.value = age;
}

// Add an event listener to the date input field
const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", calculateAge);


// Calculate the age on page load (if date of birth is already set)
calculateAge(); 

//DEFINE COURSES FOR EACH DEPARTMENT
    const courses = {
    "College of Teacher Education": ["Bachelor of Elementary Education", "Bachelor of Secondary Education major in English", "Bachelor of Secondary Education major in Mathematics",
    "Bachelor of Secondary Education major in Science", "Bachelor of Secondary Education major in Social Studies"],
    "Criminal Justice Education": ["Bachelor of Science in Criminology"],
    "College of Commerce": ["Bachelor of Science in Accountancy", "Bachelor of Science in Accounting Technology", "Bachelor of Science in Business Administration Major in Financial Management",
    "Bachelor of Science in Business Management", "Bachelor of Science in Hospitality Management", "Bachelor of Science in Hospitality Management Major in Food and Beverage",
    "Bachelor of Science in Tourism Management"],
    "College of Computer Studies": ["Bachelor of Science in Information Technology"],
    "Psychology Program": ["Bachelor of Science in Psychology"]
};

function populateCourses() {
    const departmentSelect = document.getElementById("departmentSelect");
    const courseSelect = document.getElementById("courseSelect");
    const selectedDepartment = departmentSelect.value;

    // Clear the current options in the courses select box
    courseSelect.innerHTML = "";

    // Populate the courses select box with options based on the selected department
    courses[selectedDepartment].forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.text = course;
        courseSelect.appendChild(option);
    });
}

// Add an event listener to the department select box to update the courses select box when the department changes
document.getElementById("departmentSelect").addEventListener("change", populateCourses);

// Initial population of the courses select box
populateCourses();

const cityBarangayMap = {
    'Bogo City': ['Anonang Norte', 'Anonang Sur', 'Banban', 'Binabag', 'Bungtod', 'Carbon', 'Cayang', 'Cogon', 'Dakit', 'Don Pedro', 'Gairan', 'Guadalupe', 'La Paz', 'LPC', 'Libertad', 'Lourdes', 'Malingin', 'Marangog','Nailon','Odlot', 'Pandan', 'Polambato', 'Sambag', 'San Vicente', 'Siocon', 'Sto. Nino', 'Sto.Rosario', 'Sudlonon', 'Taytayan'],

    // Add more cities and their respective barangays here
  };

  const provinceCityMap = {
    'Cebu': ['Bogo City'],
    // Add more provinces and their respective cities here
  };

  $('#province').on('change', function() {
    const selectedProvince = $(this).val();
    const cityDropdown = $('#city');
    cityDropdown.empty();
    const cities = provinceCityMap[selectedProvince] || [];
    cities.forEach(function(city) {
      cityDropdown.append($('<option>', {
        value: city,
        text: city,
      }));
    });

    // Trigger the city change event to update the barangay dropdown
    cityDropdown.trigger('change');
  });

  $('#city').on('change', function() {
    const selectedCity = $(this).val();
    const barangayDropdown = $('#barangay');
    barangayDropdown.empty();
    const barangays = cityBarangayMap[selectedCity] || [];
    barangays.forEach(function(barangay) {
      barangayDropdown.append($('<option>', {
        value: barangay,
        text: barangay,
      }));
    });
  });

  // Trigger the province change event initially to populate the city dropdown
  $('#province').trigger('change');

