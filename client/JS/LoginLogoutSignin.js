
function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value == "" || password.value == "") {
        customAlert(1, "Username or password fields are empty");
    } else if (username.value.length <= 2 || password.value.length <= 2) {
        customAlert(1, "Username or password field are to short");
    } else {
        const loginData = {
            name: username.value,
            password: password.value
        }

        let request;
        request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/Login");
        request.onreadystatechange = onRequstUpdate;
        request.send(JSON.stringify(loginData));
        function onRequstUpdate() {
            if (request.readyState < 4) {
                return;
            }
            if (request.status == 200 || request.status == 201) {
                document.cookie = "username=" + username.value + "; path=/";
                document.location.href = "index.html";
            } else {
                customAlert(1, "Username or password field are wrong");
            }
        }
    }
}

function signIn() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    if (username.value == "" || password.value == "") {
        customAlert(1, "Username or password fields are empty");
    } else {
        document.cookie = "username=" + username.value + "; path=/";
        const registerData = {
            name: username.value,
            password: password.value
        }
    
        let request;
        request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/Register");
        request.onreadystatechange = onRequstUpdate;
        request.send(JSON.stringify(registerData));

        function onRequstUpdate() {
            if (request.readyState < 4) {
                return;
            }
            if (request.status == 200 || request.status == 201) {
                let requestLogin = new XMLHttpRequest();
                requestLogin.open("POST", "http://localhost:3000/api/Login");
                requestLogin.send(JSON.stringify(registerData));
                document.location.href = "index.html";
            } else {
                customAlert(1, "Username or password field are wrong");
            }
        }
    }
}

function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = "gate.html";
}