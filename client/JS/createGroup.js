function createGroup() {
    //Create DOM elements
    const window = document.createElement("div");
    const chooseType = document.createElement("div");
    const groupChat = document.createElement("button");
    const privateChat = document.createElement("button");
    const groupDiv = document.createElement("div");
    const groupNameInput = document.createElement("input");
    const groupLabel = document.createElement("label");
    const userDiv = document.createElement("div");
    const userInput = document.createElement("input");
    const userLabel = document.createElement("label");
    const createChat = document.createElement("button");
    //Text
    groupChat.innerText = "Group chat";
    privateChat.innerText = "Private chat";
    createChat.innerText = "Create"
    groupLabel.innerText = "Group name";
    userLabel.innerText = "User/-s";
    //Design for close alert and shading div
    const chatStyle = "w-auto border-black m-auto text-[1.4rem] rounded-[0.75rem] bg-[rgb(218,33,110)] p-2";
    const divStyle = "relative flex mb-[1.5rem] h-[3.375rem] cursor-pointer";
    const inputStyle = "w-[80%] h-[100%] text-[1.2rem] bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2 m-auto";
    const labelStyle = "absolute left-[3rem] top-0 text-[1.4rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white";
    window.className = "absolute top-[30%] left-[32%] text-black w-[35%] text-[1rem] flex flex-col bg-white justify-center";
    chooseType.className = "flex flex-row w-[100%] mt-4 mb-4";
    groupChat.className = chatStyle;
    privateChat.className = chatStyle;
    groupDiv.className = divStyle;
    userDiv.className = divStyle;
    groupNameInput.className = inputStyle;
    userInput.className = inputStyle;
    groupLabel.className = labelStyle;
    userLabel.className = labelStyle;
    createChat.className = chatStyle
    //Connect header
    chooseType.appendChild(groupChat);
    chooseType.appendChild(privateChat);
    window.appendChild(chooseType);
    //Events
    groupChat.addEventListener("click", function() {
        groupDiv.appendChild(groupNameInput);
        groupDiv.appendChild(groupLabel);
        window.appendChild(groupDiv);
        userDiv.appendChild(userInput);
        userDiv.appendChild(userLabel);
        window.appendChild(userDiv);
        window.appendChild(createChat);
    });
    privateChat.addEventListener("click", function() {
        groupDiv.appendChild(groupNameInput);
        groupDiv.appendChild(groupLabel);
        window.appendChild(groupDiv);
        userDiv.appendChild(userInput);
        userDiv.appendChild(userLabel);
        window.appendChild(userDiv);
        window.appendChild(createChat);
    });
    createChat.addEventListener("click", function() {
        let allUsers = userInput.value.split(/\s+/);
        allUsers.push(actualUser);
        socket.send("New contact;" + groupNameInput.value + ";" + allUsers);
        window.remove();
    });
    //Connect other elements
    document.body.appendChild(window);
}