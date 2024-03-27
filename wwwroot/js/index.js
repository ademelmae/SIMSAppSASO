$(document).ready(function() {
    // check the status if logged
    if(sessionStorage.getItem("Logged") === "false" || sessionStorage.getItem("Logged")===undefined || sessionStorage.getItem("Logged")===null){
        window.location.href ="https://localhost:7203/"
    }

  

    // // Redirect to register student page
    // document.getElementById("registerButton").addEventListener("click", function () {
    //     window.location.href = "https://localhost:7203/home/registerstudent";
    // });
   
    $.ajax({
        url: '/api/count/studentCount',
        method: 'GET',
        success: function(data) {
            $('#studentCount').empty(); // Remove existing content
            $('#studentCount').text(data);
        }
    });

    $.ajax({
        url: '/api/count/violationCount',
        method: 'GET',
        success: function(data) {
            $('#pendingViolationCount').empty(); // Remove existing content
            $('#pendingViolationCount').text(data);
        }
    });

    $.ajax({
        url: '/api/count/approvedCount',
        method: 'GET',
        success: function(data) {
            $('#approvedViolationCount').empty(); // Remove existing content
            $('#approvedViolationCount').text(data);
        }
    });
});