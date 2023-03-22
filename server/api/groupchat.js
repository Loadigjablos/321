const { validateToken } = require("../validation/token");
const {
  newMessageSendtPublic,
  newMessageSendtPrivate,
} = require("../websocketserver.js");

/**
 *
 * @param req
 * @param res
 */
const sendMessagePrivate = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  //Am i in this chat
  //add to db

  res.status(201).json({
    message: "Deleted a user",
  });
};

/**
 *
 * @param req
 * @param res
 */
const createPrivateChat = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  //create db with me as admin

  res.status(201).json({
    message: "Deleted a user",
  });
};

/**
 *
 * @param req
 * @param res
 */
const reciveAllMessagesPrivate = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  // send all messages from chats im appart of

  res.status(201).json({
    message: "Deleted a user",
  });
};

/**
 *
 * @param req
 * @param res
 */
const sendMessagePublic = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const message = JSON.parse(data).message;

      if (!message) {
        res.status(400).json({
          message: "No message sendt",
        });
      }

      newMessageSendtPublic(user, message);

      res.status(200).json({
        message: "sendt successful",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "sending Failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const reciveAllMessagesPublic = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  // get all messages from db

  res.status(201).json({
    message: "Deleted a user",
  });
};

module.exports = {
  sendMessagePrivate,
  createPrivateChat,
  reciveAllMessagesPrivate,
  sendMessagePublic,
  reciveAllMessagesPublic,
};
