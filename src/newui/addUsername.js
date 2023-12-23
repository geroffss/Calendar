document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref('displaynames/' + user.uid).once('value').then(function(snapshot) {
                let displayName = (snapshot.val() && snapshot.val().displayName) || null;
                const username = displayName || localStorage.getItem('username');
                console.log('Username:', username);
                if (username) {
                    const navbarTitle = document.getElementById('userId');
                    console.log('Navbar title element:', navbarTitle);
                    if (navbarTitle) {
                        navbarTitle.textContent = `Hello, ${username}`;
                    }
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function updateUserInfo(user) {
        const username = localStorage.getItem('username');
        const email = user.email;
        console.log('Username:', username);
        console.log('Email:', email);
        firebase.database().ref('displaynames/' + user.uid).once('value').then(function(snapshot) {
            const displayName = (snapshot.val() && snapshot.val().displayName) || username;
            const userInfoDiv = document.getElementById('userInfo');
            if (userInfoDiv) {
                userInfoDiv.innerHTML = `<div class='flex-col'> 
                <div> Username: ${username}.</div> 
                <div> Display name: ${displayName} <input type="text" class="border-2 rounded-md" id="displayNameInput" placeholder="Enter new display name"></div>
                <div> Email: ${email}.</div> 
            </div>`;
            }
        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            updateUserInfo(user);

            document.getElementById('userInfoSave').addEventListener('click', function() {
                const displayNameInput = document.getElementById('displayNameInput');
                if (displayNameInput && displayNameInput.value) {
                    firebase.database().ref('displaynames/' + user.uid).set({
                        displayName: displayNameInput.value
                    }).then(function() {
                        console.log('Display name saved in database');
                        updateUserInfo(user);
                    });
                }
            });
        }
    });
});