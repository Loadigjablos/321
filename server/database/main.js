let pool = null;

const initializeMariaDB = async () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "supersecret123",
    //connectionLimit: 100,
  });
};

const executeSQL = async (query) => {
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
  const userTableQuery = `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT , name VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL , PRIMARY KEY (id), UNIQUE (name))`;
  await executeSQL(userTableQuery);

  const groupTableQuery = `CREATE TABLE groupchats (id INT NOT NULL AUTO_INCREMENT , users TEXT NOT NULL , name VARCHAR(255) NOT NULL , PRIMARY KEY (id), UNIQUE (name))`;
  await executeSQL(groupTableQuery);
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };
