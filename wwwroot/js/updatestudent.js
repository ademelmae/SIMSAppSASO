
function updateStudent(studentData){
    
    $("#UpdateStudentModal").modal("show");
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

  //FOR ADDRESS SELECT
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


  const departmentCourses = {
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
    const updateDepartment = document.getElementById("updateDepartment");
    const updateCourse = document.getElementById("updateCourse");
    const selectedDepartment = updateDepartment.value;

    // Clear the current options in the courses select box
    updateCourse.innerHTML = "";

    // Populate the courses select box with options based on the selected department
    departmentCourses[selectedDepartment].forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.text = course;
        updateCourse.appendChild(option);
    });
}

// Add an event listener to the department select box to update the courses select box when the department changes
document.getElementById("updateDepartment").addEventListener("change", populateCourses);

// Initial population of the courses select box
populateCourses();




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

    // Get the student ID from wherever you store it
    var studentID =  studentData.studentId

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
          window.location.href ="https://localhost:7203/home/registerstudent"
         
        
      },
      error: function (error) {
          console.log("Response details:", error.responseText);
  
          // Handle the error response
          console.error(error);

      }
  });
}


