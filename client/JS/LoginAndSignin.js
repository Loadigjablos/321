function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value == "" || password.value == "") {
        customAlert(1, "Username or password fields are empty");
    } else {
        document.cookie = "username=" + username.value + "; path=/";
        document.location.href = "index.html";
    }
}