const socket = new WebSocket("ws://localhost:3000");
const actualUser = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected!");
});

socket.addEventListener("message", (event) => {
  let reader = new FileReader();
  reader.onload = function() {
    console.log(`Received message: ${reader.result}`);
    const messageParts = reader.result.split(';');
    if (actualUser != messageParts[0]) {
      createMessage(1, {"username": messageParts[0], "message": messageParts[1]});
    } else {
      createMessage(0, {"username": messageParts[0], "message": messageParts[1]});
    }
  }
  reader.readAsText(event.data);
});

socket.addEventListener("close", (event) => {
  console.log("WebSocket closed.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
