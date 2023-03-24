const express = require("express");
const http = require("http");
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const { initializeWebsocketServer } = require("./server/websocketserver");
const { initializeAPI } = require("./server/api/main.js");
const {
  initializeMariaDB, initializeDBSchema
} = require("./server/database/main.js");
const {
  createNewGroup
} = require("./server/database/groupchat.js");

// Create the express server
const app = express();
const server = http.createServer(app);

// Middleware used for the session token
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// create a livereload server
const env = process.env.NODE_ENV || "development";
if (env !== "production") {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  // use livereload middleware
  app.use(connectLiveReload());
}

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/HTML/gate.html");
});
app.get("/gate.html", (req, res) => {
  res.sendFile(__dirname + "/client/HTML/gate.html");
});
app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/client/HTML/index.html");
});
app.get("/login.html", (req, res) => {
  res.sendFile(__dirname + "/client/HTML/login.html");
});
app.get("/registration.html", (req, res) => {
  res.sendFile(__dirname + "/client/HTML/registration.html");
});
  // Initialize the websocket server
  initializeWebsocketServer(server);
  // Initialize the REST api
  initializeAPI(app);
  
  // Allowing top-level await
(async function () {
  // Initialize the database
  await initializeMariaDB();
  await initializeDBSchema();
  await createNewGroup("BusidoChat", ["james"]);
  //start the web server
  const serverPort = process.env.PORT || 3000;
  console.log(serverPort);
  server.listen(serverPort, () => {
    console.log(
      `Express Server started on port ${serverPort} as '${env}' Environment`
    );
  });
})();
