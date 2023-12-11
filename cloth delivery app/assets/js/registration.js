
document.querySelector(".registerbtn").addEventListener("click", function(event) {
    event.preventDefault();
    validateForm();
  });
  
  function validateForm() {
    const username = document.getElementById("userName").value;
    const email = document.getElementById("useremail").value;
    const password = document.getElementById("userpw").value;
    const confirmPassword = document.getElementById("userPw").value;
  
    let errors = {};
  
    if (username === "") {
        errors.username = "Please enter a username.";
    }
  
    if (email === "") {
        errors.email = "Please enter an email address.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }
  
    if (password === "" || password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
    }
  
    if (confirmPassword === "") {
        errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
    }
  
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }
  
    const userData = {
        username: username,
        email: email,
        password: password
    };
  
    const userDataKey = userData.email;
    localStorage.setItem(userDataKey, JSON.stringify(userData));
    alert('Registration successful!');
  }
  
  
  function displayErrors(errors) {
    const error1 = document.querySelector('#error1');
    if (errors.username) {
      error1.innerHTML = errors.username;
    } else {
      error1.innerHTML = '';
    }
  
    const error2 = document.querySelector('#error2');
    if (errors.email) {
      error2.innerHTML = errors.email;
    } else {
      error2.innerHTML = '';
    }
  
    const error3 = document.querySelector('#error3');
    if (errors.password) {
      error3.innerHTML = errors.password;
    } else {
      error3.innerHTML = '';
    }
  
    const error4 = document.querySelector('#error4');
    if (errors.confirmPassword) {
      error4.innerHTML = errors.confirmPassword;
    } else {
      error4.innerHTML = '';
    }
  }
  
  
  const storedUserDataKey = userData.email;
  const storedUserData = JSON.parse(localStorage.getItem(storedUserDataKey));
  if (storedUserData) {
    console.log(storedUserData.username);
  } else {
    alert('No user data found in local storage.');
  }
  