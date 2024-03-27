$(document).ready(function() {
    $("#registrationForm").submit(function(e) {
        e.preventDefault();

        var firstname = $("#registerFirstname").val();
        var lastname = $("#registerLastname").val();
        var username = $("#registerUsername").val();
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var confirmPassword = $("#confirmPassword").val();
        var role = $("#registerRole").val();
        var missingFields = [];
        var invalidFields = [];

        // Email validation regular expression
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (firstname === '') missingFields.push('First Name');
        if (lastname === '') missingFields.push('Last Name');
        if (username === '') missingFields.push('Username');
        
        if (email === '') {
            missingFields.push('Email');
        } else if (!email.match(emailRegex)) {
            invalidFields.push('Email');
        }

        if (password === '') missingFields.push('Password');
        if (confirmPassword === '') missingFields.push('Confirm Password');

        if (missingFields.length > 0) {
            Swal.fire({
                title: 'Error',
                html: 'Please fill out the following fields:<br>' + missingFields.join('<br>'),
                icon: 'error'
            });
        } else if (invalidFields.length > 0) {
            Swal.fire({
                title: 'Error',
                html: 'Please provide a valid email address for the following field(s):<br>' + invalidFields.join('<br>'),
                icon: 'error'
            });
        } else if (password !== confirmPassword) {
            // Passwords do not match - show a SweetAlert pop-up
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match',
                icon: 'error'
            });
        } else {
            $.ajax({
                url: '/api/UserRegister/register',
                method: 'POST',
                data: JSON.stringify({
                    Firstname: firstname,
                    Lastname: lastname,
                    Username: username,
                    Email: email,
                    Password: password,
                    Role: role
                }),
                contentType: 'application/json',
                success: function(response) {
                    if (response === 'User registered successfully') {
                        Swal.fire({
                            title: 'Registration Successful',
                            text: 'User registered successfully!',
                            icon: 'success'
                        }).then(function() {
                            $("#registrationForm")[0].reset();
                            window.location.href = 'home/index';
                        });
                    } else {
                        if (response === 'User already exists') {
                            Swal.fire({
                                title: 'Error',
                                text: 'An account is already registered with that username or email address',
                                icon: 'error'
                            });
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

    $("#signup-button").click(function(e) {
        e.preventDefault();
        var password = $("#registerPassword").val();
        var confirmPassword = $("#confirmPassword").val();

        if (password !== confirmPassword) {
            // Passwords do not match - show a SweetAlert pop-up
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match',
                icon: 'error'
            });
        } else {
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
        }
    });
});
