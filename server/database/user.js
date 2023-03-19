const { executeSQL, pool } = require("./main");

const registerNewUser = async (name, password_hash) => {
    return await executeSQL("SELECT * FROM users;");
}

const deleteUserbyId = async (id) => {
    return await executeSQL("SELECT * FROM users;");
}

const getOneUserById = async (id) => {
    return await executeSQL(`SELECT * FROM users WHERE id = ${pool.escape(id)};`);
}

const getOneUserByName = async (name) => {
    return await executeSQL(`SELECT * FROM users WHERE name = ${pool.escape(name)};`);
}

const getAllUsers = async () => {
    return await executeSQL("SELECT * FROM users;");
}

module.exports = {
    registerNewUser, deleteUserbyId, getOneUserById,
    getOneUserByName, getAllUsers
};
