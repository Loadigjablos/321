let pool = null;

const initializeMariaDB = async () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "mychat",
    password: process.env.DB_PASSWORD || "mychatpassword",
    connectionLimit: 5,
  });
};

const executeSQL = async (query) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query);
    conn.end();
    return res;
  } catch (err) {
    conn.end();
    console.log(err);
  }
};

const initializeDBSchema = async () => {
    const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY (name)
    );`;
    await executeSQL(userTableQuery);
    const messageTableQuery = `CREATE TABLE IF NOT EXISTS publicmessages (
      id INT NOT NULL AUTO_INCREMENT,
      user_name VARCHAR(255) NOT NULL,
      message VARCHAR(255) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (user_name) REFERENCES users(name)
    );`;
    await executeSQL(messageTableQuery);
    const groupChatsQuery = `CREATE TABLE IF NOT EXISTS groupchats (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY (id),
    );`;
    await executeSQL(groupChatsQuery);
  };

  const {
    registerNewUser, deleteUserbyId, getOneUserById,
    getOneUserByName, getAllUsers 
  } = require("./user");

  const {} = require("./groupchat");

module.exports = {
    pool,
    executeSQL, initializeMariaDB, initializeDBSchema,
    registerNewUser, deleteUserbyId, getOneUserById,
    getOneUserByName, getAllUsers 
};
