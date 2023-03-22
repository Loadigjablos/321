function showGroup(group) {
    //Create DOM elements
    const header = document.getElementById("groupHeader");
    const chatWindow = document.getElementById("chatWindow");
    header.innerHTML = "";
    chatWindow.innerHTML = "";
    const groupAvatar = document.createElement("div");
    const avatarImage = document.createElement("IMG");
    const groupInformation = document.createElement("div");
    const groupName = document.createElement("div");
    const groupMembers = document.createElement("div");
    //Design for this elements
    groupAvatar.className = "flex items-center w-[2.5rem] h-[2.5rem] mr-[0.625rem]";
    avatarImage.className = "w-[100%] h-[100%] rounded-[50%] border-2";
    groupInformation.className = "flex flex-col justify-center";
    groupName.className = "flex items-center text-[1.125rem] leading-[1.375rem] font-bold";
    groupMembers.className = "text-[0.875rem] leading-[1.375rem]";
    //Text for elements
    groupName.innerText = group.name;
    groupMembers.innerText = group.members.length + " members";
    //Image
    avatarImage.src = "../materials/logoTest.png";
    //Connect all elements
    groupAvatar.appendChild(avatarImage);
    groupInformation.appendChild(groupName);
    groupInformation.appendChild(groupMembers);
    header.appendChild(groupAvatar);
    header.appendChild(groupInformation);
    showHistory(group);
}

function showHistory(group) {
    for (let i = 0; i < group.messages.length; i++) {
        if (group.messages[i].username == actualUser) {
            createMessage(0, group.messages[i]);
        } else {
            createMessage(1, group.messages[i]);
        }
    }
}

function sendMessage() {
    const messageField = document.getElementById("MessageField");
    socket.send(actualUser + ";" + messageField.innerText + ";" + actualChat);
    messageField.innerText = "";
    messageField.scrollIntoView();
}

function createMessage(senderType, groupMessage) {
    let date = new Date();
    //Create DOM elements
    const chatWindow = document.getElementById("chatWindow");
    const messageWindow = document.createElement("div");
    const sender = document.createElement("div");
    const message = document.createElement("div");
    const sendtime = document.createElement("div");
    //Design for this elements
    const messageWindowStyle = "mb-[0.4rem] pb-[1rem] pr-[0.5rem] flex relative flex-col max-w-[90%] min-w-[15%] rounded-[1rem] shadow-lg";
    const messageStyle = "text-[1.2rem]";
    sender.className = messageStyle + " font-semibold";
    message.className = messageStyle + " font-medium break-words";
    sendtime.className = "absolute bottom-0 right-2 text-[0.7rem] font-normal";
    if (senderType == 0) {
        messageWindow.className = messageWindowStyle + " text-white bg-[rgb(218,33,110)] ml-auto mr-0 pr-[5px] pl-[5px] shadow-[rgb(218,33,110)]";
        sender.className += " text-right";
        message.className += " text-right pt-2 pl-1";
        sendtime.className += " text-right";
        sender.innerText = "You";
    } else { 
        messageWindow.className = messageWindowStyle + " bg-white mr-auto ml-0 pr-[5px] pl-[5px] shadow-black";
        sender.className += " text-left";
        message.className += " text-left";
        sendtime.className += " text-left";
        sender.innerText = groupMessage.username;
    }
    //Text for elements
    let correctedMessage = groupMessage.message.replace(/(\r\n|\n|\r)/gm, "");
    message.innerText = correctedMessage;
    sendtime.innerText = String(new Date((parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600) * 1000).toJSON().slice(11, 16));
    //Connect all elements 
    //If you want to see "YOU" als sender, delete this "if" 
    if (senderType == 1) {
        messageWindow.appendChild(sender);
    }
    messageWindow.appendChild(message);
    messageWindow.appendChild(sendtime);
    chatWindow.appendChild(messageWindow);
    //Back to normality
    document.getElementById("growField").style.height = 2.25 + "rem";
    document.getElementById("sendButton").style.display = "none";
}

function sendController() {
    const messageField = document.getElementById("MessageField");
    const sendButton = document.getElementById("sendButton");
    messageField.addEventListener("keyup", function() {
        if(messageField.innerText.length > 0) {
            sendButton.style.display = "block";
        } else {
            sendButton.style.display = "none";
        }
    });
}

sendController();