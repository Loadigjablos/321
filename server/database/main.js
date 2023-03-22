/**
 * connects to mongodb
 * @param mogofunc this is a function that will get executed using the mongo client as a parameter
 * source: https://www.mongodb.com/developer/languages/javascript/node-connect-mongodb/
 */
const executemongoDBFunction = async (mogoFunc) => {
  let result;
  const { MongoClient } = require("mongodb");
  const URI = "mongodb+srv://user:pass@localhost/mychat/?retryWrites=true&w=majority";
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
 * source: https://adrianmejia.com/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/
 */
/*
const executemongoDBFunction = async (mogoFunc) => {
  var mongoose = require('mongoose');

  const URI = "mongodb://localhost:27017/mychat";
  let MongoDB = await mongoose.connect(URI).connection;

  result = await mogoFunc(MongoDB);
}

/**
 * 
 */
const initializeDBSchema = async () => {
  const users = (client) => {
    // schema for One User
    var user = new client.Schema({
      name: String,
      password: String,
      created: { type: Date, default: Date.now },
    });

    // Create a model based on the schema
    const USERS_MODEL = client.model("users", user);

    const newuser = new user({ name: "James", password: "pp" });

    // Save it to database
    newuser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(newuser);
      }
    });
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
