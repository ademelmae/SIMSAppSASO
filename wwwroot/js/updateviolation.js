
function updateViolation(violationData){
    console.log(violationData)
    $("#UpdateViolationModal").modal("show");
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
  