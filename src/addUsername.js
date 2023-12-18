document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    console.log('Username:', username);
    if (username) {
        const navbarTitle = document.getElementById('navbarTitle');
        console.log('Navbar title element:', navbarTitle);
        if (navbarTitle) {
            navbarTitle.textContent = `Hello, ${username}`;
        }
    }
});