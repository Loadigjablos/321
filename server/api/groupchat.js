const { validateToken } = require("../validation/token");

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
const privateChatsImAppartOf = (req, res) => {
    const user = validateToken(req.cookies.token, res).name;

    //get all chats
    //filter all im appart of
  
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

    // add message to db
  
    res.status(201).json({
      message: "Deleted a user",
    });
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

module.exports = {  };
