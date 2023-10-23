$(document).ready(function() {
    $("#registrationForm").submit(function(e) {
        e.preventDefault();

        var firstname = $("#registerFirstname").val();
        var lastname = $("#registerLastname").val();
        var username = $("#registerUsername").val();
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            $("#error-message").text("Passwords do not match");
        } else {
            $.ajax({
                url: '/api/UserRegister/register',
                method: 'POST',
                data: JSON.stringify({
                    Firstname: firstname,
                    Lastname: lastname,
                    Username: username,
                    Email: email,
                    Password: password
                }),
                contentType: 'application/json',
                success: function(response) {
                    if (response.Message === 'User registered successfully') {
                        Swal.fire({
                            title: 'Registration Successful',
                            text: 'User registered successfully!',
                            icon: 'success'
                        }).then(function() {
                            // Redirect to a success page or perform any other actions
                            window.location.href = 'success-page.html';
                        });
                    } else {
                        if (response === 'User already exists') {
                            $("#error-message").text("User already exists");
                        } else {
                            $("#error-message").text(response.Message);
                        }
                    }
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
    });

    // Add a click event for the signup button to confirm registration
    $("#signup-button").click(function() {
        Swal.fire({
            title: 'Confirm Registration',
            text: 'Are you sure you want to register?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Register',
            cancelButtonText: 'Cancel'
        }).then(function(result) {
            if (result.isConfirmed) {
                // Submit the registration form
                $("#registrationForm").submit();
            }
        });
    });
});
