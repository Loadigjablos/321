
/**
 * connects to mongodb
 * @param mogofunc this is a function that will get executed using the mongo client as a parameter
 * source: https://www.mongodb.com/developer/languages/javascript/node-connect-mongodb/
 */
const executemongoDBFunction = async (mogoFunc) => {
  let result;
  const { MongoClient } = require("mongodb");
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    // The provided function gets called
    result = await mogoFunc(client);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    return result;
  }
};

const initializeDBSchema = async () => {
  const users = (client) => {
    return listDatabases(client);
  };
  await executemongoDBFunction(users);

  const publicmessages = (client) => {
    return listDatabases(client);
  };
  await executemongoDBFunction(publicmessages);

  const groupchats = (client) => {
    return listDatabases(client);
  };
  await executemongoDBFunction(groupchats);
};

const {} = require("./user");

const {} = require("./groupchat");

module.exports = {
  executemongoDBFunction,
  initializeDBSchema,
};
