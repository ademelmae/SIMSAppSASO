
var studentId = sessionStorage.getItem("studentId"); 
fetch("/api/studentregister/getstudentdetails?studentId=" + studentId)
    .then(response => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(studentDetails => {
        displayStudentDetailsModal(studentDetails);
    })
    .catch(error => console.error("Error fetching student details:", error));

    function displayStudentDetailsModal(studentDetails) {
        console.log(studentDetails);
        // Set the values in the modal
        for (const property in studentDetails) {
            if (studentDetails.hasOwnProperty(property)) {
            $(`#info${property.charAt(0).toUpperCase()}${property.slice(1)}`).text(studentDetails[property]);
            }
        }

    }
        