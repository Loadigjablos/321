const { executeSQL } = require("./main");

const registerNewUser = async (name, password_hash) => {

}

const deleteUser = async (id) => {

}

const getOneUserById = async (id) => {

}

const getOneUserByName = async (name) => {

}

const getAllUsers = async () => {
    return await executeSQL("SELECT * FROM users;");
}

module.exports = {
    registerNewUser, deleteUser, getOneUserById,
    getOneUserByName, getAllUsers
};
