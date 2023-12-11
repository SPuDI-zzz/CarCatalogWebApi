const signUpBtn = document.getElementById("signupBtn");
const signInBtn = document.getElementById("signinBtn");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPassword = document.getElementById("confirmPassword");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");
const errorInput = document.getElementById("error");

signInBtn.onclick = signInClick;

signUpBtn.onclick = signUpClick;

async function signIn(login, password) {
    debugger;
    const body = {
        userName: login,
        password: password
    }

    const response = await fetch(`${API_URL}/account/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include'
    });
    
    return response.status === 200;
}

async function signUp(login, password) {    
    const body = {
        userName: login,
        password: password
    }

    const response = await fetch(`${API_URL}/account/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        },
        credentials: 'include'
    });

    return response;
}

async function signUpClick() {
    errorInput.innerHTML = "";
    const isContainsDisable = signUpBtn.className.includes("disable");
    if (isContainsDisable) {
        changeStylesForButtons(signInBtn, signUpBtn, "330px", "Sign Up");
        return;
    }

    if (!loginInput.value) {
        let errorMessage = "Login is required";
        errorInput.innerHTML = errorMessage;
        return;
    }
    
    if (!validatePasswords(passwordInput.value, confirmPasswordInput.value)) {
        let errorMessage = "Please make sure your passwords match";
        errorInput.innerHTML = errorMessage;
        return;
    }

    const response = await signUp(loginInput.value, passwordInput.value);
    if (response.ok) {
        await signInClick();
        return;
    }
    
    let responseBody = await response.json();

    let errorMessage = responseBody.errors.map(error => error.description).join(" ");
    errorInput.innerHTML = errorMessage;
}

async function signInClick() {
    debugger;
    errorInput.innerHTML = "";
    const isContainsDisable = signInBtn.className.includes("disable");
    if (isContainsDisable) {
        changeStylesForButtons(signUpBtn, signInBtn, "0", "Sign In");
        return;
    }

    const isSignIn = await signIn(loginInput.value, passwordInput.value);

    if (isSignIn) {
        window.location.replace("http://127.0.0.1:5500/Home");            
        return;
    }
 
    errorInput.innerHTML = "The login or password is incorrect.";
}

function changeStylesForButtons(firstBtn, secondBtn, widthConfirmPassword, titleMessage) {
    confirmPassword.style.maxWidth = widthConfirmPassword;
    title.innerHTML = titleMessage
    firstBtn.classList.add("disable");
    secondBtn.classList.remove("disable");
}

function validatePasswords(password, confirmPassword) {
    if (!password || !confirmPassword)
        return false;

    if (password !== confirmPassword)
        return false;

    return true;
}
