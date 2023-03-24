const { createToken, validateToken } = require("../validation/token");
let crypto = require("crypto");
const {
  registerNewUser,
  deleteUserbyName,
  getOneUserByName,
  getAllUsers,
} = require("../database/user");
const {
  joinGroupp
} = require("../database/groupchat");

//source: https://flaviocopes.com/node-request-data/

/**
 * adds the user to the data base
 * @param req
 * @param res
 */
const register = (req, res) => {
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const name = JSON.parse(data).name;
      const sha256Hasher = crypto.createHmac("SHA-256", "secret");
      const password = sha256Hasher
        .update(JSON.parse(data).password)
        .digest("hex");

      if (!name && name.lenght < 3) {
        res.status(404).json({
          message: "name is invalid",
        });
      }
      if (!password && password.lenght < 9) {
        res.status(404).json({
          message: "Password is invalid",
        });
      }

      registerNewUser(name, password);

      joinGroupp(name, "BusidoChat");

      res.status(200).json({
        message: "user succesfuly registerd",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Registration Failed",
    });
  }
};

/**
 * makes a JWT session token
 * @param req
 * @param res
 */
const login = (req, res) => {
  try {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const name = JSON.parse(data).name;
      const sha256Hasher = crypto.createHmac("SHA-256", "secret");
      const password = sha256Hasher
        .update(JSON.parse(data).password)
        .digest("hex");

      getOneUserByName(name).then((user) => {
        if (user == undefined) {
          res.status(400).json({
            message: "Login Failed",
          });
        }
        const currentUser = user[0];

        if (!currentUser.name) {
          res.status(404).json({
            message: "User was not found",
          });
        }
        if (currentUser.password !== password) {
          res.status(404).json({
            message: "User was not found",
          });
        }

        res.cookie("token", createToken(currentUser.name), {
          httpOnly: true,
          maxAge: 60000000, // 6h
        });

        res.status(201).json({
          message: "Login successful",
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Login Failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const deleteMyself = (req, res) => {
  try {
    const user = validateToken(req.cookies.token, res).name;

    if (deleteUserbyName(user) != false) {
      res.status(201).json({
        message: "Deleted a user",
      });
    }
    res.status(400).json({
      message: "Unable to Delete yourself",
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
const getAllUsersInterface = (req, res) => {
  try {
    validateToken(req.cookies.token, res);

    getAllUsers().then((users) => {
      if (users != false) {
        res.status(200).json(users);
      }
      res.status(404).json({
        message: "No Users found",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Failed",
    });
  }
};

module.exports = { register, login, deleteMyself, getAllUsersInterface };
