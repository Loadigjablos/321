const { executeSQL } = require("./main");

const registerNewUser = async (name, password) => {
    const query = `INSERT INTO users (id, name, password) VALUES (NULL, '${name}', '${password}');`;

    return await executeSQL(query);
}

const deleteUserbyName = async (name) => {
    const query = `DELETE FROM users WHERE name = '${name}'`;

    return await executeSQL(query);
}

const getOneUserByName = async (name) => {
    const query = `SELECT * FROM users WHERE name = '${name}'`;

    return await executeSQL(query);
}

const getAllUsers = async () => {
    const query = `SELECT name FROM users`;

    return await executeSQL(query);
}

module.exports = {
    registerNewUser, deleteUserbyName,
    getOneUserByName, getAllUsers
};
