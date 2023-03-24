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
const reciveAllMessagesInterface = async (req, res) => {
  try {
    const user = validateToken(req.cookies.token, res).name;
    console.log("USSSSSSSSSSSSSSSEEEEEEEEEEEEER " + user);
    const data = await getGroupMessages(user);

    if (data !== false) {
      res.status(200).json(data);
    } else {
      res.status(400).json({
        message: "Failed",
      });
    }

  } catch (e) {
    console.log("ERROR IN GROUPCHAT: " + e);
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
  try {
    validateToken(req.cookies.token, res).name;
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
  try {
    validateToken(req.cookies.token, res).name;
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const name = JSON.parse(data).name;

      deleteGroup(name);

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
const joinGrouppInterface = (req, res) => {
  try {
    const user = validateToken(req.cookies.token, res).name;
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const name = JSON.parse(data).name;
      joinGroupp(user, name);
      res.status(200).json({
        message: "Succes",
      });
    });
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
