let socket = new WebSocket("ws://localhost:3000");
const actualUser = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
let actualChat = 0;

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected!");
});

socket.addEventListener("message", (event) => {
  let reader = new FileReader();
  reader.onload = function() {
    console.log(`Received message: ${reader.result}`);
    const messageParts = reader.result.split(';');
    if (messageParts[0] == "Message") {
      if (actualChat == messageParts[3]) {
        if (actualUser != messageParts[1]) {
          createMessage(1, {"username": messageParts[1], "message": messageParts[2]});
        } else {
          createMessage(0, {"username": messageParts[1], "message": messageParts[2]});
        }
      }
    } else if (messageParts[0] == "New contact") {
      if (messageParts[2].includes(actualUser)) {
        const groupData = {
          "name": messageParts[1],
          "members": messageParts[2].split(','),
          "messages": []
        }
        createContact(groupData);
      } else {
        
      }
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

document.body.onload = function() {
  if (actualUser == "") {
    document.location.href = "gate.html";
  }
  customAlert(3,'Successfully login');
}
