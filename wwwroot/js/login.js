const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loadingSpinner = document.getElementById("loadingSpinner");


// check if logged in
if (sessionStorage.getItem("Logged") === "true") {
    window.location.href = "https://localhost:7203/home/dashboard"
}

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function showLoadingSpinner() {
    loadingSpinner.style.display = "block";
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    loadingSpinner.style.display = "none";
}

// Function to handle errors
function handleErrors(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// Function to handle errors
function handleErrors(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// LOGIN
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show the loading spinner while making the request
    showLoadingSpinner();

    // Get the input values
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    // Create an object to hold the user credentials
    const user = {
        Username: username,
        Password: password,
        Role: role
    };

    fetch('/api/userlogin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data); // Log the response
            if (data.role !== undefined && data.userId !== undefined) {
                console.log("Login successful");
                sessionStorage.setItem("Logged", true);
                sessionStorage.setItem("Role", data.role);
                sessionStorage.setItem("UserId", data.userId);
                window.location.href = 'https://localhost:7203/home/dashboard';
            } else {
                throw new Error('Role or UserId is undefined');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            hideLoadingSpinner();
    
            // Display a SweetAlert error message
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'An error occurred during login',
            });
        });
    
    
});
