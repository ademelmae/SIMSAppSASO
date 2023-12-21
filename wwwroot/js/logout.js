
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
    const token = sessionStorage.getItem('Logged');
    console.log('Token:', token);
    if (token==="true") {
        // Token is not present; the user may not be logged in
        sessionStorage.setItem("Logged",false);
        window.location.href = "https://localhost:7203/"
    }
}

