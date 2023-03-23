const { executemongoDBFunction } = require("./main");

const registerNewUser = async (name, password) => {
    executemongoDBFunction((client) => {

        client.db.getCollection("users").insertMany( 
            [
                {
                  name: 'hello',
                  password: 'hello'
                }
            ]
        )

    });
}

const deleteUserbyName = async (name) => {
    executemongoDBFunction((client) => {

    });
}

const getOneUserByName = async (name) => {
    executemongoDBFunction((client) => {
        client.db.getCollection("users").find({
            name: name
        })
    });
}

const getAllUsers = async () => {
    executemongoDBFunction((client) => {
        client.db.getCollection("users").find({});
    });
}

module.exports = {
    registerNewUser, deleteUserbyName,
    getOneUserByName, getAllUsers
};
