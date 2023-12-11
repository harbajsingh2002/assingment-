
const loginForm = document.getElementById('form');
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('useremail').value;
  const password = document.getElementById('userPw').value;
  const storedUserData = JSON.parse(localStorage.getItem(email));

  if (storedUserData && storedUserData.password === password) {
    alert('Welcome');
    
    window.location.href = '/home.html';
  } else {
    alert('Invalid login credentials');
  }
});