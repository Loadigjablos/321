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
      if (actualChat == messageParts[3] || actualChat == messageParts[1]) {
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
    } else if (messageParts[0] == "New private contact") {
      if (messageParts[1].includes(actualUser)) {
        const contact = messageParts[1].split(',');
        let contactName = "";
        if (actualUser != contact[0]) {
          contactName = contact[0];
        } else {
          contactName = contact[1];
        }
        const groupData = {
          "name": contactName,
          "messages": []
        }
        createContact(groupData, 1);
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
