const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loadingSpinner = document.getElementById("loadingSpinner");


// check if logged in
if(sessionStorage.getItem("Logged") === "true"){
    window.location.href ="https://localhost:7203/home/dashboard"
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

    // Create an object to hold the user credentials
    const user = {
        Username: username,
        Password: password
    };

    fetch('/api/userlogin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(handleErrors)
    .then(response => {
        // Check for a successful status (status code in the range 200-299)
        if (response.status >= 200 && response.status < 300) {
            hideLoadingSpinner();
            console.log("Login successful");
            sessionStorage.setItem("Logged", true)
            window.location.href = 'https://localhost:7203/home/dashboard';
        } else {
            hideLoadingSpinner();
            console.error("Login failed with status:", response.status);
            // You can display an appropriate error message here
        }
    })
    .catch(error => {
        hideLoadingSpinner();
        console.error('Login error:', error);

        // Display a SweetAlert error message
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.message || 'Username or password is incorrect',
        });
    });
});
