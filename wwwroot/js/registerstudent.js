    
$(document).ready(function () {
    $('#studentForm').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission
        $('#confirmationModal').modal('show'); // Show the confirmation modal
    });

    // Handle the confirmation button click
    $('#confirmYes').click(function () {
        $('#confirmationModal').modal('hide');
        $('#studentForm').unbind('submit').submit; // Unbind the submit event and submit the form
        
        const studentData = {
            FirstName: document.getElementById("firstname").value,
            MiddleName: document.getElementById("middlename").value,
            LastName: document.getElementById("lastname").value,
            Birthdate: document.getElementById("dob").value,
            Age: parseInt(document.getElementById("age").value),
            Gender: document.getElementById("gender").value,     
            Phone :  document.getElementById("phone").value.toString(),
            Email: document.getElementById("emailadd").value,
            Home: document.getElementById("home").value,
            StudentIdNum: document.getElementById("studentidnum").value.toString(),
            Department: document.getElementById("departmentSelect").value,
            Course: document.getElementById("courseSelect").value,
            SchoolYear: document.getElementById("yearSelect").value,
            ParentName: document.getElementById("parentName").value,
            ParentContact: document.getElementById("parentContact").value.toString(),
            ParentEmail: document.getElementById("parentEmail").value,
            ParentHome: document.getElementById("parentHome").value,  
    };

    fetch('/api/studentregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })
            .then(response => response.json())
            .then(studentData => {
                // Handle success, e.g., show a success message to the user
                console.log('Registered student successfully:', studentData);
                alert('Registered student successfully!');

                document.getElementById('studentForm').reset();

            })
            .catch(error => {
                // Handle errors, e.g., display an error message to the user
                console.error('Error:', error);
                alert('An error occurred while submitting the violation.');
            });
    });
});

function calculateAge() {    
    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");

    // Get the selected date from the input field
    const selectedDate = new Date(dobInput.value);

    // Calculate the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - selectedDate.getFullYear();

    // Check if the birthdate has occurred this year or not
    if (
        currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getDate() < selectedDate.getDate())
    ) {
        age--;
    }

    // Update the age input field
    ageInput.value = age;
}

// Add an event listener to the date input field
const dobInput = document.getElementById("dob");
dobInput.addEventListener("input", calculateAge);


// Calculate the age on page load (if date of birth is already set)
calculateAge(); 

//DEFINE COURSES FOR EACH DEPARTMENT
    const courses = {
    "College of Teacher Education": ["Bachelor of Elementary Education", "Bachelor of Secondary Education major in English", "Bachelor of Secondary Education major in Mathematics",
    "Bachelor of Secondary Education major in Science", "Bachelor of Secondary Education major in Social Studies"],
    "Criminal Justice Education": ["Bachelor of Science in Criminology"],
    "College of Commerce": ["Bachelor of Science in Accountancy", "Bachelor of Science in Accounting Technology", "Bachelor of Science in Business Administration Major in Financial Management",
    "Bachelor of Science in Business Management", "Bachelor of Science in Hospitality Management", "Bachelor of Science in Hospitality Management Major in Food and Beverage",
    "Bachelor of Science in Tourism Management"],
    "College of Computer Studies": ["Bachelor of Science in Information Technology"],
    "Psychology Program": ["Bachelor of Science in Psychology"]
};

// Function to populate the courses select box based on the selected department
function populateCourses() {
    const departmentSelect = document.getElementById("departmentSelect");
    const courseSelect = document.getElementById("courseSelect");
    const selectedDepartment = departmentSelect.value;

    // Clear the current options in the courses select box
    courseSelect.innerHTML = "";

    // Populate the courses select box with options based on the selected department
    courses[selectedDepartment].forEach(course => {
        const option = document.createElement("option");
        option.value = course;
        option.text = course;
        courseSelect.appendChild(option);
    });
}

// Add an event listener to the department select box to update the courses select box when the department changes
document.getElementById("departmentSelect").addEventListener("change", populateCourses);

// Initial population of the courses select box
populateCourses();



