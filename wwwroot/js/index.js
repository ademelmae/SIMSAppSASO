 // Ensure jQuery is loaded and available
 $(document).ready(function() {
    $.ajax({
        url: '/api/count/studentCount',
        method: 'GET',
        success: function(data) {
            $('#studentCount').empty(); // Remove existing content
            $('#studentCount').text(data);
        }
    });

    $.ajax({
        url: '/api/count/pendingViolationCount',
        method: 'GET',
        success: function(data) {
            $('#pendingViolationCount').empty(); // Remove existing content
            $('#pendingViolationCount').text(data);
        }
    });

    $.ajax({
        url: '/api/count/approvedViolationCount',
        method: 'GET',
        success: function(data) {
            $('#approvedViolationCount').empty(); // Remove existing content
            $('#approvedViolationCount').text(data);
        }
    });
});