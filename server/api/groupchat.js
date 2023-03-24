const { validateToken } = require("../validation/token");
const { 
  createNewGroup,
  getGroupMessages,
  deleteGroup,
  joinGroupp,
 } = require("../database/groupchat");

/**
 *
 * @param req
 * @param res
 */
const reciveAllMessagesInterface = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  try {
    getGroupMessages(user).then((array) => {
      if (result !== false) {
        res.status(201).json(result);
      }
      res.status(400).json({
        message: "Failed",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const createGrouppInterface = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const name = JSON.parse(data).name;
      const users = JSON.parse(data).users;

      createNewGroup(name, users).then(() => {
        res.status(201).json({
          message: "Success",
        });
      });

    });
  } catch (e) {
    res.status(500).json({
      message: "Failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const deleteGroupInterface = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  try {

    deleteGroup();

  } catch (e) {
    res.status(500).json({
      message: "Failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const joinGrouppInterface = (req, res) => {
  const user = validateToken(req.cookies.token, res).name;

  try {

    joinGroupp(user);

  } catch (e) {
    res.status(500).json({
      message: "Failed",
    });
  }
};

module.exports = {
  reciveAllMessagesInterface,
  deleteGroupInterface,
  createGrouppInterface,
  joinGrouppInterface
};
