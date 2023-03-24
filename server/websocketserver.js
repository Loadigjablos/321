const WebSocket = require("ws");
const { addNewMessageToGroupp } = require("./database/groupchat");

// source: https://stackoverflow.com/questions/6623113/is-it-possible-to-send-a-message-to-all-active-websocket-connections-using-eith
let global_counter = 0;
let all_active_connections = {};

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};
/* If a new connection is established it will get added to the global connections and now its posible to send every one connected to the websocket messages
 * source: https://stackoverflow.com/questions/6623113/is-it-possible-to-send-a-message-to-all-active-websocket-connections-using-eith
 */
const onConnection = (ws) => {
  let id = global_counter++;

  console.log("[" + id + "] New websocket connection");

  all_active_connections[id] = ws;
  ws.id = id;

  ws.on("message", (message) => {
    console.log(message);
    const data = JSON.parse(message);

    for (conn in all_active_connections) {
      all_active_connections[conn].send(`{
          "chatname": "${data.chatname}",
          "name": "${data.name}",
          "message": "${data.message}",
          "time": "${data.time}"
        }`);
        addNewMessageToGroupp(data.chatname, data.name, data.message, data.time);
    }
  }).on("close", function () {
    delete all_active_connections[ws.id];
  });
};

module.exports = { initializeWebsocketServer };
