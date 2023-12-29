var violationId = sessionStorage.getItem("violationId");

$.ajax({
  url: "/api/violation/" + violationId,
  method: "GET",
  success: function (data) {
      // Populate the modal form fields with the retrieved data
      updateViolation({
          "violationType":data.violationType,
          "violationDate":data.violationDate,
          "violationTime":data.violationTime,
          "offenseLevel":data.offenseLevel,
          "disciplinaryAction":data.disciplinaryAction,
          "offenseType":data.offenseType,
          "location":data.location,
          "description":data.description,
          "reportingName":data.reportingName,
          "reportingRole":data.reportingRole,
          "reportingContact":data.reportingContact,
          "status":data.status
        })

  },
  error: function () {
      alert("Error retrieving student data");
  }
});
function updateViolation(violationData){
    console.log(violationData)
    $("#updateViolationType").val(violationData.violationType)
    $("#updateViolationDate").val(violationData.violationDate)
    $("#updateViolationTime").val(violationData.violationTime)
    $("#updateOffenseLevel").val(violationData.offenseLevel)
    $("#updateDisciplinaryAction").val(violationData.disciplinaryAction)
    $("#updateOffenseType").val(violationData.offenseType)
    $("#updateLocation").val(violationData.location)
    $("#updateDescription").val(violationData.description)
    $("#updateReportingName").val(violationData.reportingName)
    $("#updateReportingRole").val(violationData.reportingRole)
    $("#updateReportingContact").val(violationData.reportingContact)
    if(violationData.status ==="pending"){
      $("#updateStatusPending").prop("checked", true);
    }
    else if (violationData.status === "approved"){
      $("#updateStatusApproved").prop("checked", true);
    }
  }


  function updateDisciplinaryAction() {
    var selectedViolation = $("#updateViolationType").val();
    var selectedOffenseLevel = $("#updateOffenseLevel").val();
    
    if (selectedViolation && selectedOffenseLevel) {
      fetch(`/api/disciplinaryactions?offenseLevel=${selectedOffenseLevel}&violationId=${selectedViolation}`)
        .then(response => response.json())
        .then(data => {
          const disciplinaryActionInput = document.getElementById("updateDisciplinaryAction");
          disciplinaryActionInput.value = data.join(", ");
        });
    }
  }

  $("#updateViolationType").change(updateDisciplinaryAction);
  $("#updateOffenseLevel").change(updateDisciplinaryAction);
  