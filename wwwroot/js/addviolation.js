document.getElementById('searchButton').addEventListener('click', function () {
    event.preventDefault(); 
    const query = document.getElementById('searchInput').value;

    // Make an API request to search students
    fetch(`/api/studentRegister/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const student = data[0]; // Assuming only one student is found
                document.getElementById('studentidnum').value = student.studentIdNum;
                document.getElementById('firstname').value = student.firstname;
                document.getElementById('middlename').value = student.middlename;
                document.getElementById('lastname').value = student.lastname;
                document.getElementById('dob').value = student.birthdate;
                document.getElementById('age').value = student.age;
                document.getElementById('gender').value = student.gender;
                document.getElementById('phone').value = student.phone;
                document.getElementById('emailadd').value = student.email;
                document.getElementById('home').value = student.home;
                document.getElementById('departmentSelect').value = student.department;
                document.getElementById('courseSelect').value = student.course;
                document.getElementById('yearSelect').value = student.schoolYear;
                document.getElementById('parentName').value = student.parentName;
                document.getElementById('parentHome').value = student.parentHome;
                document.getElementById('parentContact').value = student.parentContact;
                document.getElementById('parentEmail').value = student.parentEmail;
            } else {
                alert('Student not found.');
            }
        })
        .catch(error => console.error('Error:', error));
});

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