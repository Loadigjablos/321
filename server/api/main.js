const {
  register,
  login,
  deleteMyself,
  getAllUsersInterface,
} = require("./user");
const {
  sendMessagePrivate,
  createPrivateChat,
  reciveAllMessagesPrivate,
  sendMessagePublic,
  reciveAllMessagesPublic,
} = require("./groupchat");

const initializeAPI = (app) => {
  // default REST api endpoint

  app.post("/api/Register", register);
  app.post("/api/Login", login);
  app.delete("/api/User", deleteMyself);
  app.get("/api/Users", getAllUsersInterface);

  app.post("/api/private/Send", sendMessagePrivate);
  app.post("/api/private/NewChat", createPrivateChat);
  app.get("/api/private/Recive", reciveAllMessagesPrivate);

  app.post("/api/public/Send", sendMessagePublic);
  app.get("/api/public/Recive", reciveAllMessagesPublic);
};

module.exports = { initializeAPI };
