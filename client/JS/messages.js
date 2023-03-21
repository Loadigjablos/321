function showGroup(group) {
    //Create DOM elements
    const header = document.getElementById("groupHeader");
    header.innerHTML = "";
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
        if (group.messages[i].username == ('; '+document.cookie).split(`; username=`).pop().split(';')[0]) {
            createMessage(0, group.messages[i]);
        } else {
            createMessage(1, group.messages[i]);
        }
    }
}

function sendMessage() {
    const messageField = document.getElementById("MessageField");
    createMessage(0, { "message": messageField.innerText});
    messageField.innerText = "";
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
    const messageWindowStyle = "mb-[0.0625rem] flex relative flex-col max-w-[40%] min-w-[15%] rounded-[1.2rem]";
    const messageStyle = "text-[1.2rem]";
    sender.className = messageStyle + " font-semibold";
    message.className = messageStyle + " font-medium";
    sendtime.className = "text-[0.8rem] font-normal";
    if (senderType == 0) {
        messageWindow.className = messageWindowStyle + " text-white bg-[rgb(218,33,110)] ml-auto mr-0 pr-[5px] pl-[5px]";
        sender.className += " text-right";
        message.className += " text-right";
        sendtime.className += " text-right";
        sender.innerText = "You";
    } else { 
        messageWindow.className = messageWindowStyle + " bg-white mr-auto ml-0 pr-[5px] pl-[5px]";
        sender.className += " text-left";
        message.className += " text-left";
        sendtime.className += " text-left";
        sender.innerText = groupMessage.username;
    }
    //Text for elements
    message.innerText = groupMessage.message;
    sendtime.innerText = date.getHours() + ":" + date.getMinutes();
    //Connect all elements 
    messageWindow.appendChild(sender);
    messageWindow.appendChild(message);
    messageWindow.appendChild(sendtime);
    chatWindow.appendChild(messageWindow);
}