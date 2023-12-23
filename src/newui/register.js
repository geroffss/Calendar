

firebase.initializeApp(firebaseConfig);

window.onload = function () {
  document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

 
    const email = document.getElementById('username').value; // Assuming this is the email
    const password = document.getElementById('password').value;
    const modalText = document.getElementById('modalText');

  
    if (email.trim() !== '' && password.trim() !== '') {

      document.getElementById('username').disabled = false;
      document.getElementById('password').disabled = false;
      document.getElementById('username2').disabled = false;
      document.getElementById('password2').disabled = false;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          document.getElementById('modalText').innerText = 'Registration successful!';
          document.getElementById('myModal').classList.remove('hidden');

          document.getElementById('username').disabled = false;
          document.getElementById('password').disabled = false;
          document.getElementById('username2').disabled = false;
          document.getElementById('password2').disabled = false;

          document.getElementById('regDiv').style.display = 'none';
          document.getElementById('loginDiv').style.display = 'block';


        })
        .catch((error) => {
          var errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            document.getElementById('modalText').innerText = 'Email already in use. Please choose another.';
            document.getElementById('myModal').classList.remove('hidden');

     
            document.getElementById('username').disabled = false;
            document.getElementById('password').disabled = false;
            document.getElementById('username2').disabled = false;
            document.getElementById('password2').disabled = false;

       
          } else {
            document.getElementById('modalText').innerText = 'Registration failed. Please try again.';
            document.getElementById('myModal').classList.remove('hidden');

       
            document.getElementById('username').disabled = false;
            document.getElementById('password').disabled = false;
            document.getElementById('username2').disabled = false;
            document.getElementById('password2').disabled = false;

   
          }
        });
    } else {
      document.getElementById('modalText').innerText = 'Please enter both email and password.';
      document.getElementById('myModal').classList.remove('hidden');

      document.getElementById('username').disabled = false;
      document.getElementById('password').disabled = false;
      document.getElementById('username2').disabled = false;
      document.getElementById('password2').disabled = false;
    }
  });
}