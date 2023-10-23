

logoutButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Use SweetAlert for confirmation
    Swal.fire({
        title: 'Are you sure you want to log out?',
        text: 'You will be logged out and redirected to the login page.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log me out',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed logout
            logout(); // Call the logout function when the user confirms
        }
    });
});

function logout() {
    const token = localStorage.getItem('userToken');
    console.log('Token:', token);
    if (!token) {
        // Token is not present; the user may not be logged in
        console.log('User is not logged in');
        return;
    }

    // Close the modal
    // logoutModal.style.display = 'none'; // You can remove this line as the modal is not used with SweetAlert

    // Make a POST request to the server to logout
    fetch('/api/UserAPI/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            // Successful logout on the server
            console.log('Logged out successfully');
        } else {
            // Handle logout failure (e.g., server error)
            console.error('Logout failed');
        }

        // Remove the token from local storage in any case
        localStorage.removeItem('userToken');
        // Redirect to the login page or another appropriate page
        window.location.href = 'index';
    })
    .catch(error => {
        console.error('Logout error:', error);
    });
}

window.addEventListener('load', function () {
    const storedToken = localStorage.getItem('userToken');

    if (!storedToken) {
        // You can use the stored token for authentication here
        window.location.href = 'index';
    } else {
        console.log('User is already logged in with token:', storedToken);
    }
});
