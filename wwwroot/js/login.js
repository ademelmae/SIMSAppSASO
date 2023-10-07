const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

//LOGIN
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

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
        window.location.href = 'dashboard';
         console.log('Token stored in localStorage:', localStorage.getItem('userToken'));
    })
    .catch(error => {
        console.error('Login error:', error);
        console.error('Error storing token in localStorage:', error);
        // Handle login error (e.g., show an error message to the user)
    });
});

window.addEventListener('load', function () {
const storedToken = localStorage.getItem('userToken');
if (storedToken) {
    // You can use the stored token for authentication here
    console.log('User is already logged in with token:', storedToken);
     window.location.href = 'home/dashboard';
}
});