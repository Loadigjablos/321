let socket = new WebSocket("ws://localhost:3000");
const actualUser = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
document.getElementById("yourName").innerText = actualUser;
let actualChat = 0;

socket.addEventListener("open", (event) => {
  console.log("WebSocket connected!");
});

socket.addEventListener("message", (event) => {
  let reader = new FileReader();
  reader.onload = function() {
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
          "members": messageParts[2].split(',')
        }
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/Groupp");
        request.onreadystatechange = onRequstUpdate;
        request.send(JSON.stringify(groupData));
    
        function onRequstUpdate() {
            if (request.readyState < 4) {
                return;
            }
            if (request.status == 200 || request.status == 201) {} else {
                customAlert(1, "Unable To Create");
            }
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
    } else if (messageParts[0] == "StatusCheck") {
      if (messageParts[1] != actualUser) {
        console.log(messageParts[1] + " Is online");
        let clickMe = document.getElementById("memberButton");
        let groupUsers = document.getElementById("allMembers");
        if (messageParts[2] != undefined) {
          for (let i = 0; i < groupUsers.children.length; i++) {
            if (messageParts[1] == groupUsers.children[i].children[0].innerText) {
              groupUsers.children[i].children[1].className = groupUsers.children[i].children[1].className + " bg-gray-300";
              groupUsers.children[i].children[1].title = "Offline";
              clickMe.click();
              clickMe.click();
            }
          }
        } else {
          for (let i = 0; i < groupUsers.children.length; i++) {
            if (messageParts[1] == groupUsers.children[i].children[0].innerText) {
              if (groupUsers.children[i].children[1].title == "Offline") {
                groupUsers.children[i].children[1].title = "Online";
                groupUsers.children[i].children[1].className = groupUsers.children[i].children[1].className + " bg-lime-600";
              }
            }
          }
       }
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
  GetAllContactsRequest();
  //customAlert(3,'Successfully login');
}

function deleteMyself() {
  let request = new XMLHttpRequest();
  request.open("DELETE", "http://localhost:3000/api/User");
  request.send();
  document.location.href = "gate.html";
}

window.onbeforeunload = function() {
  socket.send("StatusCheck;" + actualUser + ";" + 1);
}

setInterval(function(){socket.send("StatusCheck;" + actualUser)}, 3000);