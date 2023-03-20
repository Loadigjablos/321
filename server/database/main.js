let pool = null;

const initializeMariaDB = async () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
  database: process.env.DB_NAME || "mychat",
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "supersecret123",
  port: 3306,
  //connectionLimit: 5,
  });
};

const executeSQL = async (query, variables = null) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query, variables);
    conn.end();
    return res;
  } catch (err) {
    try {
      conn.end();
    } catch (e) {}
    console.log(err);
  }
  return false;
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
      admin VARCHAR(255) NOT NULL,
      users VARCHAR(65536) NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (admin) REFERENCES users(name)
    );`;
    await executeSQL(groupChatsQuery);
    
  };

  const {
    registerNewUser, deleteUserbyName, getOneUserById,
    getOneUserByName, getAllUsers 
  } = require("./user");

  const {} = require("./groupchat");

module.exports = {
    pool,
    executeSQL, initializeMariaDB, initializeDBSchema,
    registerNewUser, deleteUserbyName, getOneUserById,
    getOneUserByName, getAllUsers 
};


