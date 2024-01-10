jQuery(document).ready(function ($) {
    //filter by status
    $('#statusFilter').on('change', function () {
        var selectedStatus = $(this).val();

        // Use DataTable API to filter rows based on the selected status
        $('#violationsTable').DataTable().column(6)  // Assuming 'Status' is the 7th column (index 6)
            .search(selectedStatus)
            .draw();
    });

    //display the table
        fetch("/api/violation/getViolationsTable")
            .then(response => response.json())
            .then(data => {
                var tableBody = $("#violations-table-body");
                tableBody.empty();

                data.forEach(function (item) {
                    var row = $("<tr></tr>");

                    for (var key in item) {
                        if (key !== 'violationId') {
                            var cell = $("<td></td>").text(item[key]);
                            row.append(cell);
                        }
                    }

                    // Add action cell to the row
                    var actionCell = $("<td class='text-center' style='width: 120px;'></td>");
                   //INFO BUTTON
                   var infoButton = $("<button></button>")
                  .addClass("btn btn-info btn-sm mr-1") 
                  .css({
                    display: "inline-block",
                    margin: "",
                    background:""
                  })
                  .html('<i class="fas fa-info-circle"></i>')
                  .on("click", function () {
                    var violationId = item.violationId;
                    sessionStorage.setItem("violationId", violationId);
                    
                    // Redirect to another view
                    window.location.href = "/Home/ViewViolationInfo";
                });
                    actionCell.append(infoButton);
                    
                    //UPDATE BUTTON
                  var updateButton = $("<button></button>")
                  .addClass("btn btn-warning btn-sm") 
                  .css({
                    display: "inline-block",
                    margin: "2px",
                    background: ""
                  })
                  .html('<i class="fas fa-edit"></i>')
                  .on("click", function () {
               
                    var violationId = item.violationId;
                    sessionStorage.setItem("violationId", violationId);
                    
                    // Redirect to another view
                    window.location.href = "/Home/UpdateViolation";
                    
          
                  });
  
                actionCell.append(updateButton);
                    //DELETE BUTTON
                    var deleteButton = $("<button></button>")
                    .addClass("btn btn-danger btn-sm") // No margin for the last button
                    .css("display", "inline-block") // Set display property to inline-block
                    .html('<i class="fas fa-trash-alt"></i>')
                    .on("click", function () {
                    var violationId = item.violationId; 

                    Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to delete this violation?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Delete",
                    }).then((willDelete) => {
                        if (willDelete.isConfirmed) {
                            // Send a DELETE request to the server to delete the student
                            fetch("/api/violation/deleteViolation/" + violationId, {
                                method: "DELETE",
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error("Network response was not ok");
                                        console.log(response)
                                    }
                                    return response.json();
                                })
                                .then(deleteResponse => {
                                    // Handle success, e.g., show a success message to the user
                                    console.log('Violation student successfully:', deleteResponse);
            
                                    Swal.fire({
                                        title: "Success",
                                        text: "Violation deleted successfully!",
                                        icon: "success",
                                        timer: 3000,
                                        showConfirmButton: true
                                    });
            
                                    row.remove();
                                })
                                .catch(error => {
                                    // Handle errors, e.g., display an error message to the user
                                    console.error('Error deleting violation:', error);
                                    alert('An error occurred while deleting the violation.');
                                });
                        }
                        });
                    });
                    actionCell.append(deleteButton);

                // Append the action cell to the row
                row.append(actionCell);

                // Append the row to the table body
                tableBody.append(row);
            });

                    $('#violationsTable').DataTable({
                    "paging": true,
                    "ordering": true,
                    "info": true,
                    });
            });

            
            
});


// UPDATE THE DISCIPLINARY ACTION
  function updateDisciplinaryAction() {
    var selectedViolation = $("#violationSelect").val();
    var selectedOffenseLevel = $("#offenseLevelSelect").val();
    
    if (selectedViolation && selectedOffenseLevel) {
      fetch(`/api/disciplinaryactions?offenseLevel=${selectedOffenseLevel}&violationId=${selectedViolation}`)
        .then(response => response.json())
        .then(data => {
          const disciplinaryActionInput = document.getElementById("disciplinaryActionInput");
          disciplinaryActionInput.value = data.join(", ");
        });
    }
  }

  $("#violationSelect").change(updateDisciplinaryAction);
  $("#offenseLevelSelect").change(updateDisciplinaryAction);


//ADD VIOLATION FORM
document.getElementById('violationForm').addEventListener('submit', function (e) {
    e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save this data?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
    
            if (result.isConfirmed) {
                // User confirmed, proceed with saving the data
                
                const approvalStatusElements = document.getElementsByName('approvalStatus');
                let selectedApprovalStatus;
    
                approvalStatusElements.forEach(element => {
                    if (element.checked) {
                        selectedApprovalStatus = element.value;
                    }
                });
    
        
        const studentViolation = {
            StudentName: document.getElementById('studentName').value,
            StudentIdNum: document.getElementById('studentID').value,
            Course: document.getElementById('courseSelect').value,
            AcademicYear: document.getElementById('academicYear').value,
            ViolationType: document.getElementById('violationSelect').selectedOptions[0].text,
            ViolationDate: document.getElementById('dateOfViolation').value,
            ViolationTime: document.getElementById('timeOfViolation').value,
            OffenseLevel: document.getElementById('offenseLevelSelect').value,
            DisciplinaryAction: document.getElementById('disciplinaryActionInput').value,
            OffenseType: document.getElementById('offenseType').value,
            Location: document.getElementById('location').value,
            Description: document.getElementById('description').value,
            Attachment: document.getElementById('attachment').value,
            ReportingName: document.getElementById('reportingPersonName').value,
            ReportingRole: document.getElementById('role').value,
            ReportingContact: document.getElementById('contact').value,
            Status: selectedApprovalStatus,
        };
    
         fetch('/api/violation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(studentViolation),
                })
                .then(response => {
                    if (response.ok) {
                        return response.json().catch(() => ({})); // Parse the response JSON or an empty object
                    } else {
                        throw new Error(`Error saving data: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(data => {
                    if (data) {
                        // Success: Show a SweetAlert for success
                        Swal.fire({
                            icon: 'success',
                            title: 'Confirmed Violation Successfully',
                            text: 'Violation has been successfully added.',
                        });
                    } else {
                        console.error('No valid JSON data received from the server.');
                    }
                })
                .catch(error => {
                    // Error: Show a SweetAlert for error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Network error or failed to save data: ${error}`,
                    });
                });
            }
      });
    });