const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const submitRegister = document.querySelector('#submitRegister');
const inputNameRegister = document.querySelector('#inputNameRegister');
const inputEmailRegister = document.querySelector('#inputEmailRegister');
const inputPasswordRegister = document.querySelector('#inputPasswordRegister');
const registerSuccess = document.querySelector('#registerSuccess');

const inputEmailLogin = document.querySelector('#inputEmailLogin');
const inputPasswordLogin = document.querySelector('#inputPasswordLogin');
const submitLogin = document.querySelector('#submitLogin');
const userName = document.querySelector('#userName');
const nameErrorSignUp = document.querySelector('#nameErrorSignUp');
const passwordErrorLogin = document.querySelector('#passwordErrorLogin');

// const userName = localStorage.getItem('loggedInUser');


let dataArray = [];

// Event listener for form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    let savedUsers = JSON.parse(localStorage.getItem('usersData')) || [];

    
    const userData = {
        name: inputNameRegister.value.trim(),
        email: inputEmailRegister.value.trim(),
        password: inputPasswordRegister.value.trim()
    };

    
    const userExists = savedUsers.some(user => user.email === userData.email);

    if (userExists) {
    
        nameErrorSignUp.classList.replace("d-none", "d-block");
        console.log("Email already exists:", userData.email);
    } else {
    
        savedUsers.push(userData);
        localStorage.setItem('usersData', JSON.stringify(savedUsers));

        
        registerSuccess.classList.replace("d-none", "d-block");

        console.log("User registered successfully:", userData);
        console.log("All users data saved to localStorage:", savedUsers);

        setTimeout(() => {
            registerSuccess.classList.add("d-none"); 
            registerForm.classList.add("d-none");   
            loginForm.classList.remove("d-none");  
            console.log("Redirecting to login form...");
        }, 2000);
    }
});

// Clear all users function
function clearAllUsers() {
    localStorage.removeItem('usersData');
    console.log('All user data has been cleared from local storage.');
    
    dataArray = [];
}

// Make sure to call this when needed
document.getElementById('clearUsersBtn').addEventListener('click', clearAllUsers);


// submit login form

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    loadFromLocalStorage(); 
    const loginEmail = inputEmailLogin.value.trim().toLowerCase();
    const loginPassword = inputPasswordLogin.value.trim();


    const user = dataArray.find(data => data.email.toLowerCase() === loginEmail && data.password === loginPassword);

    if (user) {
        console.log("Login successful", user);
        localStorage.setItem('loggedInUser', user.name);
        window.location.href = 'home-page.html';
    } else {
        passwordErrorLogin.classList.remove("d-none");
        console.log("Login failed: Invalid email or password.");
    }

    console.log("All data in Local Storage:", localStorage);
});


// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
    console.log("Data saved in LocalStorage");
    
}


// Load from data in local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('usersData');
    if (savedData) {
        dataArray = JSON.parse(savedData);
        console.log("Data loaded from LocalStorage:", dataArray);
    } else {
        console.log("No data found in Local Storage.");
        dataArray = []; 
    }
}



// function change form 
function changeFormData() {
    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none'); 
        registerForm.classList.add('d-none');
        console.log("Switched to Login Page");
    } else {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        console.log("Switched to Register Page");
    }
}

