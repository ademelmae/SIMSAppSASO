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
                      text: "Do you want to update information of student?",
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
          timer: 10000,
          willClose: () => {
              window.location.href = "https://localhost:7203/home/studentlists";
          },
      });
      
       
      
    },
    error: function (error) {
        console.log("Response details:", error.responseText);

        // Handle the error response
        console.error(error);

    }
});
}

