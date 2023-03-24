const { executeSQL } = require("./main");

const registerNewUser = async (name, password) => {
    try {
        const query = `INSERT INTO users (id, name, password) VALUES (NULL, '${name}', '${password}');`;

        return await executeSQL(query);
    } catch (e) {
        console.log(e);
        return null;
    }
}

const deleteUserbyName = async (name) => {
    try {
        const query = `DELETE FROM users WHERE name = '${name}'`;

        return await executeSQL(query);
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getOneUserByName = async (name) => {
    try {
        const query = `SELECT * FROM users WHERE name = '${name}'`;

        return await executeSQL(query);
    } catch (e) {
        console.log(e);
        return null;
    }
}

const getAllUsers = async () => {
    try {
        const query = `SELECT name FROM users`;

        return await executeSQL(query);
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = {
    registerNewUser, deleteUserbyName,
    getOneUserByName, getAllUsers
};