const WebSocket = require("ws");

// source: https://stackoverflow.com/questions/6623113/is-it-possible-to-send-a-message-to-all-active-websocket-connections-using-eith
let global_counter = 0;
let all_active_connections = {};

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};

// If a new connection is established it will get added to the global connections and now its posible to send every one connected to the websocket messages
//source: https://stackoverflow.com/questions/6623113/is-it-possible-to-send-a-message-to-all-active-websocket-connections-using-eith
const onConnection = (ws) => {
  console.log("New websocket connection");
  var id = global_counter++;
  all_active_connections[id] = ws;
  ws.id = id;
  ws.on("message", (message) => {
    console.log("WS ON " + message);
    for (conn in all_active_connections) {
      all_active_connections[conn].send(message);
    }
  }).on('close', function() {
    delete all_active_connections[ws.id];
  });
};

const newMessageSendtPublic = (username, message) => {
  console.log("TEST");
  for (conn in all_active_connections) {
    all_active_connections[conn].send(`{
      "chatname": "public",
      "name": "${username}",
      "message": "${message}"
    }`);
  }
}

const newMessageSendtPrivate = (username, message, chat) => {

}

module.exports = { initializeWebsocketServer, newMessageSendtPublic, newMessageSendtPrivate };
