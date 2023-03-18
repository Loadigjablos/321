const { getOneUserByName } = require("./user");
const jwt = require('jsonwebtoken')

/**
 * 
 * @param req 
 * @param res 
 */
const register = (req, res) => {
    const { name, password } = req.body;
  
  };
  
  /**
   *  Source: https://github.com/bgdnvk/nodejs-auth
   * @param req 
   * @param res 
   */
  const login = (req, res) => {
    const { name, password } = req.body;

    const validUsername = getOneUserByName(name);

    if (!validUsername.name) {
        res.status(404).json({
            message: "User was not found"
        });
    }

    const token = jwt.sign(
        { username },
        process.env.TOKEN_KEY,
        {
            expiresIn: 72000
        }
    )
  
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60000, // 6h
    });
    res.status(200).json({
        message: "Login successful"
    });
  };
  
  /**
   * 
   * @param req 
   * @param res 
   */
  const deleteMyself = (req, res) => {
  
  };
  
  /**
   * 
   * @param req 
   * @param res 
   */
  const getAllUsers = (req, res) => {
  
    res.send("Hello World!");
    res.status(401).json({
        message: "Login not successful",
        error: "Password is incorrect",
    });
};

module.exports = { register, login, deleteMyself, getAllUsers };