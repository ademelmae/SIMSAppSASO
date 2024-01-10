
var violationId = sessionStorage.getItem("violationId"); 
fetch("/api/violation/getViolationDetails?violationId=" + violationId)
    .then(response => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(violationDetails => {
        displayViolationsModal(violationDetails);
    })
    .catch(error => console.error("Error fetching violation details:", error));

    function displayViolationsModal(violationDetails) {
        console.log(violationDetails);
        // Set the values in the modal
        for (const property in violationDetails) {
            if (violationDetails.hasOwnProperty(property)) {
            $(`#info${property.charAt(0).toUpperCase()}${property.slice(1)}`).text(violationDetails[property]);
            }
        }

    }
        