const { executeSQL } = require("./main");

const registerNewUser = async ($name, $password_hash) => {

}

const deleteUser = async ($id) => {

}

const getOneUser = async ($id) => {

}

const getAllUsers = async () => {
    return await executeSQL("SELECT * FROM users;");
}
