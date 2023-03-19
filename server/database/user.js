const { executeSQL, pool } = require("./main");

const registerNewUser = async (name, password) => {
    return await executeSQL(`INSERT INTO users (id, name, password) VALUES (NULL, ?, ?);`, [pool.escape(name), pool.escape(password)]);
}

const deleteUserbyName = async (name) => {
    return await executeSQL("DELETE FROM users WHERE name = ?;", [pool.escape(name)]);
}

const getOneUserById = async (id) => {
    return await executeSQL(`SELECT * FROM users WHERE id = ?;`, [pool.escape(id)]);
}

const getOneUserByName = async (name) => {
    return await executeSQL(`SELECT * FROM users WHERE name = ?;`, [pool.escape(name)]);
}

const getAllUsers = async () => {
    return await executeSQL("SELECT id, name FROM users;");
}

module.exports = {
    registerNewUser, deleteUserbyName, getOneUserById,
    getOneUserByName, getAllUsers
};
