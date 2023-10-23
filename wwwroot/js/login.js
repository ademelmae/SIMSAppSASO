const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loadingSpinner = document.getElementById("loadingSpinner");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Function to show the loading spinner
function showLoadingSpinner() {
    loadingSpinner.style.display = "block";
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    loadingSpinner.style.display = "none";
}

//LOGIN
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

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

    // Make a POST request to the API's login endpoint
    fetch('/api/UserAPI/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        // Hide the loading spinner when the request is complete
        hideLoadingSpinner();

        if (response.ok) {
            return response.json();
        } else {
            console.log(response.status); // Log the status code
            return response.text().then(errorMsg => {
                console.log(errorMsg); // Log the error message from the response body
                throw new Error('Login failed');
            });
        }
    })
    .then(data => {
        // If login is successful, you can handle the token here
        console.log(data);
        const token = data.Token;
        console.log('Login successful. Token:', token);
        // You can store the token in a secure manner, such as in a cookie or localStorage
        localStorage.setItem('userToken', token);
        window.location.href = 'home/dashboard';
        console.log('Token stored in localStorage:', localStorage.getItem('userToken'));
    })
    .catch(error => {
        console.error('Login error:', error);
        console.error('Error storing token in localStorage:', error);

        // Display a SweetAlert error message
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Your login credentials are incorrect. Please try again.',
        });
    });
});

window.addEventListener('load', function () {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
        // You can use the stored token for authentication here
        console.log('User is already logged in with token:', storedToken);
        window.location.href = 'dashboard';
    }
});
