// استرجاع عناصر DOM
let logOutBtn = document.getElementById("logOutBtn");
let welcomeUser = document.getElementById("loggedInUser");

// استرجاع اسم المستخدم من localStorage
const loggedInUser = localStorage.getItem('loggedInUser');

// التحقق إذا كان هناك مستخدم مسجل الدخول
if (loggedInUser) {
    document.getElementById('loggedInUser').innerHTML = `Welcome, <span id="userName">${loggedInUser}</span>`;
} else {
    document.getElementById('loggedInUser').innerHTML = "Welcome, Guest!";
}

// عند النقر على زر تسجيل الخروج
logOutBtn.addEventListener("click", function () {
    // إزالة اسم المستخدم من localStorage
    localStorage.removeItem("userName");
    
    // إعادة التوجيه إلى صفحة تسجيل الدخول
    window.location.href = "index.html";
});
