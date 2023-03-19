const { register, login, deleteMyself, getAllUsersInterface } = require("./user");
const {} = require("./groupchat");

const initializeAPI = (app) => {
    // default REST api endpoint
  
    app.post("/api/Register", register);
    app.post("/api/Login", login);
    app.delete("/api/User", deleteMyself);
    app.get("/api/Users", getAllUsersInterface);
};

module.exports = { initializeAPI };
