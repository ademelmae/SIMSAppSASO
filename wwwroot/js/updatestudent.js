var studentId = sessionStorage.getItem("studentId");

$.ajax({
  url: "/api/studentregister/" + studentId,
  method: "GET",
  success: function (data) {
    console.log(data);
      // Populate the modal form fields with the retrieved data
      updateStudent({
        "studentIdNum":data.studentIdNum,
        "firstname":data.firstname,
        "middlename":data.middlename,
        "lastname":data.lastname,
        "birthdate":data.birthdate,
        "age":data.age,
        "gender":data.gender,
        "phone":data.phone,
        "email":data.email,
        "province":data.province,
        "city":data.city,
        "barangay":data.barangay,
        "street":data.street,
        "zip":data.zip,
        "academicYear":data.academicYear,
        "department":data.department,
        "course": data.course,
        "yearLevel": data.yearLevel,
        "parentName":data.parentName,
        "parentHome":data.parentHome,
        "parentContact":data.parentContact,
        "parentEmail":data.parentEmail,
      });
     
  },
  error: function () {
      alert("Error retrieving student data");
  }
});

function updateStudent(studentData){

  // $("#UpdateStudentModal").modal("show");
  $("#updateStudentIdNum").val(studentData.studentIdNum)
  $("#updateFirstname").val(studentData.firstname)
  $("#updateMiddlename").val(studentData.middlename)
  $("#updateLastname").val(studentData.lastname)
  $("#updateBirthdate").val(studentData.birthdate)
  $("#updateAge").val(studentData.age)
  $("#updateGender").val(studentData.gender)
  $("#updatePhone").val(studentData.phone)
  $("#updateEmail").val(studentData.email)
  $("#updateProvince").val(studentData.province)
  $("#updateCity").val(studentData.city)
  $("#updateBarangay").val(studentData.barangay)
  $("#updateStreet").val(studentData.street)
  $("#updateZip").val(studentData.zip)
  $("#updateAcademicYear").val(studentData.academicYear)
  $("#updateEmail").val(studentData.email)
  $("#updateDepartment").val(studentData.department)
  $("#updateCourse").val(studentData.course)
  $("#updateYearLevel").val(studentData.yearLevel)
  $("#updateParentName").val(studentData.parentName)
  $("#updateParentHome").val(studentData.parentHome)
  $("#updateParentContact").val(studentData.parentContact)
  $("#updateParentEmail").val(studentData.parentEmail)
  console.log(studentData);


  // Assuming you have a button to trigger the update
    $('#updateStudentForm').submit(function (e) {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
                      text: "Do you want to submit the form?",
                      icon: "warning",
                      showCancelButton: true, 
                      confirmButtonText: "Submit",
          }).then((willSubmit) => {
            if (willSubmit.isConfirmed) {
                updateStudentInDatabase(studentData);
                
            }
          });
    
    });
}

function calculateAge() {    
  const dobInput = document.getElementById("updateBirthdate");
  const ageInput = document.getElementById("updateAge");

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
const dobInput = document.getElementById("updateBirthdate");
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
  const departmentSelect = document.getElementById("updateDepartment");
  const courseSelect = document.getElementById("updateCourse");
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
document.getElementById("updateDepartment").addEventListener("change", populateCourses);

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

$('#updateProvince').on('change', function() {
  const selectedProvince = $(this).val();
  const cityDropdown = $('#updateCity');
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

$('#updateCity').on('change', function() {
  const selectedCity = $(this).val();
  const barangayDropdown = $('#updateBarangay');
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
$('#updateProvince').trigger('change');




function updateStudentInDatabase(studentData) {
  // Get the updated student data from the modal
  var updatedStudent = {
      studentIdNum: $("#updateStudentIdNum").val(),
      firstname: $("#updateFirstname").val(),
      middlename: $("#updateMiddlename").val(),
      lastname: $("#updateLastname").val(),
      birthdate: $("#updateBirthdate").val(),
      age: $("#updateAge").val(),
      gender: $("#updateGender").val(),
      phone: $("#updatePhone").val(),
      email: $("#updateEmail").val(),
      province: $("#updateProvince").val(),
      city: $("#updateCity").val(),
      barangay: $("#updateBarangay").val(),
      street: $("#updateStreet").val(),
      zip: $("#updateZip").val(),
      academicYear: $("#updateAcademicYear").val(),
      department: $("#updateDepartment").val(),
      course: $("#updateCourse").val(),
      yearLevel: $("#updateYearLevel").val(),
      parentName: $("#updateParentName").val(),
      parentHome: $("#updateParentHome").val(),
      parentContact: $("#updateParentContact").val(),
      parentEmail: $("#updateParentEmail").val()
  };
  var studentID = sessionStorage.getItem("studentId");
  // Make the PUT request to update the student
  $.ajax({
    url: `/api/StudentRegister/updatestudent/${studentID}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(updatedStudent),
    success: function (response) {
        // Handle the success response
        console.log(response);
        $("#UpdateStudentModal").modal("hide");

        // Display SweetAlert success message
        Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            text: 'Student information has been updated successfully!',
            timer: 9000,
        });
        window.location.href ="https://localhost:7203/home/studentlists"
       
      
    },
    error: function (error) {
        console.log("Response details:", error.responseText);

        // Handle the error response
        console.error(error);

    }
});
}

