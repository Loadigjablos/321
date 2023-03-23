/**
 * connects to mongodb
 * @param mogofunc this is a function that will get executed using the mongo client as a parameter
 * source: https://www.mongodb.com/developer/languages/javascript/node-connect-mongodb/
 */

const executemongoDBFunction = async (mogoFunc) => {
  let result;
  const { MongoClient } = require("mongodb");
  const URI = "mongodb://user:pass@localhost/mychat/?retryWrites=true&w=majority";
  const CLIENT = new MongoClient(URI);
  try {
    await CLIENT.connect();

    // The provided function gets called
    result = await mogoFunc(CLIENT);
  } catch (err) {
    console.error(err);
  } finally {
    await CLIENT.close();
    return result;
  }
};

/**
 * 
 */
const initializeDBSchema = async () => {
  const users = (client) => {



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
