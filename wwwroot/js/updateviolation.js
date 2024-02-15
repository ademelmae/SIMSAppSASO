var violationId = sessionStorage.getItem("violationId");

$.ajax({
  url: "/api/violation/" + violationId,
  method: "GET",
  success: function (data) {
    console.log(data);
    // Populate the modal form fields with the retrieved data
    updateViolation(data);
  },
  error: function () {
    alert("Error retrieving violation data");
  }
});

function updateViolation(violationData) {
  // Populate the modal form fields
  $("#updateViolationType").val(violationData.violationType);
  $("#updateViolationDate").val(violationData.violationDate);
  $("#updateViolationTime").val(violationData.violationTime);
  $("#updateOffenseLevel").val(violationData.offenseLevel);
  $("#updateDisciplinaryAction").val(violationData.disciplinaryAction);
  $("#updateOffenseType").val(violationData.offenseType);
  $("#updateLocation").val(violationData.location);
  $("#updateDescription").val(violationData.description);
  $("#updateReportingName").val(violationData.reportingName);
  $("#updateReportingRole").val(violationData.reportingRole);
  $("#updateReportingContact").val(violationData.reportingContact);

  if (violationData.status === "pending") {
    $("#updateStatusPending").prop("checked", true);
  } else if (violationData.status === "approved") {
    $("#updateStatusApproved").prop("checked", true);
  }

  // Assuming you have a button to trigger the update
  $('#updateViolationForm').submit(function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update information of the violation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((willSubmit) => {
      if (willSubmit.isConfirmed) {
        updateViolationInDatabase(violationData);
      }
    });
  });
}

function updateViolationInDatabase(violationData) {
  // Get the updated violation data from the modal
  var updatedViolation = {
    violationType: $("#updateViolationType").val(),
    violationDate: $("#updateViolationDate").val(),
    violationTime: $("#updateViolationTime").val(),
    offenseLevel: $("#updateOffenseLevel").val(),
    disciplinaryAction: $("#updateDisciplinaryAction").val(),
    offenseType: $("#updateOffenseType").val(),
    location: $("#updateLocation").val(),
    description: $("#updateDescription").val(),
    reportingName: $("#updateReportingName").val(),
    reportingRole: $("#updateReportingRole").val(),
    reportingContact: $("#updateReportingContact").val(),
    status: $("input[name='updateStatus']:checked").val(),
  };

  var violationId = sessionStorage.getItem("violationId");
  // Make the PUT request to update the violation
  $.ajax({
    url: `/api/violation/updateviolation/${violationId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(updatedViolation),
    success: function (response) {
      // Handle the success response
      console.log(response);
      // Display SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Violation information has been updated successfully!',
        timer: 10000,
        willClose: () => {
          window.location.href = "https://localhost:7203/home/violationlists";
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

$(document).ready(function () {
  $("#submitbtn").click(function () {
    updateViolationDataInDatabase();
  });
});
