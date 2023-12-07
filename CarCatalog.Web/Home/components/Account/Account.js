let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let confirmPassword = document.getElementById("confirmPassword");
let title = document.getElementById("title");

signinBtn.onclick = function() {
    confirmPassword.style.maxWidth = "0";
    title.innerHTML = "Sign In"
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function() {
    confirmPassword.style.maxWidth = "330px";
    title.innerHTML = "Sign Up"
    signinBtn.classList.add("disable");
    signupBtn.classList.remove("disable");
}
