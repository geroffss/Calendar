firebase.initializeApp(firebaseConfig);

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('username2').value; // Assuming this is the email
    const password = document.getElementById('password2').value;
    const submitButton = document.getElementById('submitBtn');
    if (email.trim() !== '' && password.trim() !== '') {
        submitButton.disabled = true;
        document.getElementById('username2').disabled = true;
        document.getElementById('password2').disabled = true;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Store authentication state and username in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', email); // Assuming the email is the username

                // Show modal with success message
                document.getElementById('modalText').innerText = 'Login successful!';
                document.getElementById('myModal').classList.remove('hidden');

                setTimeout(function() {
                    window.location.href = 'endUser.html';
                    var userId = firebase.auth().currentUser.uid;
                    renderCalendar().then(() => colorDateDivs(userId));

                }, 2000);
            })
            .catch((error) => {
                var errorCode = error.code;
                if (errorCode === 'auth/user-not-found') {
                    // Show modal with error message
                    document.getElementById('modalText').innerText = 'User not found. Please register or enter valid credentials.';
                    document.getElementById('myModal').classList.remove('hidden');
                } else if (errorCode === 'auth/wrong-password') {
                    // Show modal with error message
                    document.getElementById('modalText').innerText = 'Invalid password';
                    document.getElementById('myModal').classList.remove('hidden');
                } else {
                    // Show modal with error message
                    document.getElementById('modalText').innerText = 'Login failed. Please try again.';
                    document.getElementById('myModal').classList.remove('hidden');
                }
                submitButton.disabled = false;
                document.getElementById('username2').disabled = false;
                document.getElementById('password2').disabled = false;
            });
    } else {
        // Show modal with error message
        document.getElementById('modalText').innerText = 'Please enter both email and password.';
        document.getElementById('myModal').classList.remove('hidden');
        submitButton.disabled = false;
        document.getElementById('username2').disabled = false;
        document.getElementById('password2').disabled = false;
    }
});