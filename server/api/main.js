const { register, login, deleteMyself, getAllUsers } = require("./user");
const {} = require("./groupchat");

const initializeAPI = (app) => {
    // default REST api endpoint
  
    app.post("/api/register", register);
    app.post("/api/login", login);
    app.delete("/api/user", deleteMyself);
    app.get("/api/users", getAllUsers);
};

module.exports = { initializeAPI };