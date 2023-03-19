//Source: https://github.com/bgdnvk/nodejs-auth

const jwt = require("jsonwebtoken");

const createToken = (name) => {
    const token = jwt.sign({ name }, "FAKE_SECRET", {
        expiresIn: 72000,
      });
    
      return token;
}

const validateToken = (token) => {
    return jwt.verify(token, 'FAKE_SECRET');
}

module.exports = { createToken, validateToken };
