const { createToken, validateToken } = require("../validation/token");
const {
  registerNewUser,
  deleteUserbyName,
  getOneUserByName,
  getAllUsers,
} = require("../database/main");

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
      const password = JSON.parse(data).password;

      if (!name) {
        res.status(404).json({
          message: "User was not found",
        });
      }
      if (!password && password.lenght > 9) {
        res.status(404).json({
          message: "User was not found",
        });
      }

      registerNewUser(name, password);

      res.status(200).json({
        message: "Login successful",
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
      const user = getOneUserByName(JSON.parse(data).name);

      if (!user.name) {
        res.status(404).json({
          message: "User was not found",
        });
      }
      if (!user.password !== JSON.parse(data).password) {
        res.status(404).json({
          message: "User was not found",
        });
      }

      res.cookie("token", createToken(user.name), {
        httpOnly: true,
        maxAge: 600000, // 6h
      });

      res.status(201).json({
        message: "Login successful",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
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
  const user = validateToken(req.cookies.token, res).name;

  if (deleteUserbyName(user) != false) {
    res.status(201).json({
      message: "Deleted a user",
    });
  }
  res.status(400).json({
    message: "Unable to Delete yourself",
  });
};

/**
 *
 * @param req
 * @param res
 */
const getAllUsersInterface = (req, res) => {
  validateToken(req.cookies.token, res);

  const users = getAllUsers();

  if (users != false) {
    res.status(200).json(users);
  }
  res.status(404).json({
    message: "No Users found",
  });
};

module.exports = { register, login, deleteMyself, getAllUsersInterface };
