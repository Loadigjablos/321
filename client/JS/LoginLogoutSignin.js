const testUserList = [
    {"name":"Levan", "password": "123"},
    {"name":"Mat", "password": "123"},
    {"name":"Baran", "password": "123"}
];
function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    for (let i = 0; i < testUserList.length; i++) {
        if (username.value == "" || password.value == "") {
            customAlert(1, "Username or password fields are empty");
            break;
        } else if (username.value.length <= 2 || password.value.length <= 2) {
            customAlert(1, "Username or password field are to short");
            break;
        } else if(testUserList[i].name == username.value && testUserList[i].password == password.value) {
            document.cookie = "username=" + username.value + "; path=/";
            document.location.href = "index.html";
        } else if (i == testUserList.length - 1) {
            customAlert(1, "Username or password field are wrong");
        }
    }  

}
function signIn() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    for (let i = 0; i < testUserList.length; i++) {
        if (username.value == "" || password.value == "") {
            customAlert(1, "Username or password fields are empty");
        } else {
            document.cookie = "username=" + username.value + "; path=/";
            document.location.href = "index.html";
        }
    }  
}
function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location.href = "gate.html";
}