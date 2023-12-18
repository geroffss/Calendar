document.addEventListener('DOMContentLoaded', function() {
    const regDiv = document.getElementById('regDiv');
    const loginDiv = document.getElementById('loginDiv');
    const showlogin = document.getElementById('showlogin');
    const showreg = document.getElementById('showreg');
    const myModal = document.getElementById('myModal');
    const closeModal = document.getElementById('closeModal');
  
    regDiv.style.display = 'none';
    loginDiv.style.display = 'block';
  
    showlogin.addEventListener('click', function() {
      loginDiv.style.display = 'block';
      regDiv.style.display = 'none';
    });
  
    showreg.addEventListener('click', function() {
      regDiv.style.display = 'block';
      loginDiv.style.display = 'none';
    });
  
    closeModal.addEventListener('click', function() {
      myModal.classList.add('hidden');
    });
  });