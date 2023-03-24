const {
  register,
  login,
  deleteMyself,
  getAllUsersInterface,
} = require("./user");
const {
  reciveAllMessagesInterface,
  deleteGroupInterface,
  createGrouppInterface,
  joinGrouppInterface
} = require("./groupchat");

const initializeAPI = (app) => {
  // default REST api endpoint

  app.post("/api/Register", register);
  app.post("/api/Login", login);
  app.delete("/api/User", deleteMyself);
  app.get("/api/Users", getAllUsersInterface);

  app.get("/api/AllMessages", reciveAllMessagesInterface);
  app.delete("/api/Groupp", deleteGroupInterface);
  app.post("/api/Groupp", createGrouppInterface);
  app.post("/api/GrouppJoin", joinGrouppInterface);

};

module.exports = { initializeAPI };
