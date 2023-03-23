const { validateToken } = require("../validation/token");
const {  } = require("../database/groupchat");

/**
 *
 * @param req
 * @param res
 */
const reciveAllMessages = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  const result = getGroupMessages(user);
  if (result !== false) {
    res.status(201).json(result);
  }
  res.status(201).json({
    message: "Unable to get data",
  });
};

/**
 *
 * @param req
 * @param res
 */
const createGroupp = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  getGroupMessages(user);
  if (result !== false) {
    res.status(201).json(result);
  }
  res.status(201).json({
    message: "Unable to get data",
  });
};

/**
 *
 * @param req
 * @param res
 */
const deleteGroup = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  // get all messages from db

  res.status(201).json({
    message: "Deleted a user",
  });
};

module.exports = {
  reciveAllMessages,
  deleteGroup,
  
};
