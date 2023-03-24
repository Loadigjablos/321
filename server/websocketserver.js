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
  console.log("ALL CONNECTIONS: " + ws);
  console.log("GLOBAL Connection: " + global_counter++);
  all_active_connections[id] = ws;
  ws.id = id;

  ws.on("message", (message) => {
    const messageParts = (Buffer.from(message).toString()).split(';');

    console.log(messageParts);

    if(messageParts[0] == "StatusCheck") {

    } else if(messageParts[0] == "Message") {
      const chatName = messageParts[3];
      const name = messageParts[1];
      const messageS = messageParts[2]
      const nowTime = String(new Date((parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600) * 1000).toJSON().slice(11, 16));
      for (conn in all_active_connections) {
        all_active_connections[conn].send(message);  
      }
      addNewMessageToGroupp(chatName, name, messageS, nowTime);
    }
  }).on("close", function () {
    delete all_active_connections[ws.id];
  });
};

module.exports = { initializeWebsocketServer };
