function createGroup() {
    //Check
    try {
        let allWindows = document.getElementsByClassName("absolute top-[25%] left-[35%] text-black w-[35%] text-[1rem] flex flex-col bg-white justify-center");
        for (let i = 0; i < allWindows.length; i++) {
            allWindows[i].innerHTML = " ";
        }
    } catch (pizdec) {

    }
    //Create DOM elements
    const window = document.createElement("div");
    const chooseType = document.createElement("div");
    const groupChat = document.createElement("button");
    const privateChat = document.createElement("button");
    const closeWindow = document.createElement("button");
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
    closeWindow.innerText = "X";
    //Placeholders
    groupNameInput.placeholder = "Enter group name";
    //Design for close alert and shading div
    const chatStyle = "w-auto border-black m-auto text-[1.4rem] rounded-[0.75rem] bg-[rgb(218,33,110)] p-2 mb-2";
    const divStyle = "relative flex mb-[1.5rem] h-[3.375rem] cursor-pointer";
    const inputStyle = "w-[80%] h-[100%] text-[1.2rem] bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2 m-auto placeholder:text-[1rem]";
    const labelStyle = "absolute left-[3rem] top-0 text-[1.4rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white";
    window.className = "absolute top-[25%] left-[35%] text-black w-[35%] text-[1rem] flex flex-col bg-white justify-center";
    chooseType.className = "flex flex-row w-[100%] mt-4 mb-4";
    groupChat.className = chatStyle;
    privateChat.className = chatStyle;
    groupDiv.className = divStyle;
    userDiv.className = divStyle;
    groupNameInput.className = inputStyle;
    userInput.className = inputStyle;
    groupLabel.className = labelStyle;
    userLabel.className = labelStyle;
    createChat.className = chatStyle;
    closeWindow.className = "absolute right-2 top-0 text-[2rem] text-red-600 hover:bg-gray-300";
    //Connect header
    chooseType.appendChild(groupChat);
    chooseType.appendChild(privateChat);
    window.appendChild(closeWindow);
    window.appendChild(chooseType);
    //Events
    closeWindow.addEventListener("click", function() {
        window.remove();
    });
    groupChat.addEventListener("click", function() {
        userLabel.innerText = "Username/-s";
        userInput.placeholder = "Enter username/-s with whitespace";
        groupDiv.appendChild(groupNameInput);
        groupDiv.appendChild(groupLabel);
        window.appendChild(groupDiv);
        userDiv.appendChild(userInput);
        userDiv.appendChild(userLabel);
        window.appendChild(userDiv);
        window.appendChild(createChat);
        createChat.addEventListener("click", function() {
            let allUsers = userInput.value.split(/\s+/);
            let trueUsers = [];
            const allContacts = document.getElementById("contactList").children;
            allUsers.push(actualUser);
            let idiotStop = 0;
            for (let i = 0; i < allContacts.length; i++) {
                if (allContacts[i].children[1].children[0].innerText == groupNameInput.value) {
                    idiotStop = 1;
                }
            }
            if (idiotStop === 0) {
                if (userInput.value != "" || groupNameInput.value != "") {                
                    for (let i = 0; i < allUsers.length; i++) {
                        if (testUserList.some(item => item.name == allUsers[i])) {
                            trueUsers.push(allUsers[i]);
                        }
                    }
                    if (allUsers.length > trueUsers.length) {
                        customAlert(2, "Some users doesn't exist");
                    } else {
                        socket.send("New contact;" + groupNameInput.value + ";" + allUsers);
                        window.remove();
                    }      
                } else {
                    customAlert(2, "Please provide group name and username for 1 or more user/-s");
                }
            } else {
                customAlert(2, "You already have this group");
            }
        });
    });
    privateChat.addEventListener("click", function() {
        userLabel.innerText = "Username";
        userInput.placeholder = "Enter username";
        groupDiv.remove();
        userDiv.appendChild(userInput);
        userDiv.appendChild(userLabel);
        window.appendChild(userDiv);
        window.appendChild(createChat);
        userInput.addEventListener('keypress', function ( event ) {  
             if (event.key == " ") {
               event.preventDefault();
             }
         });
        createChat.addEventListener("click", function() {
            if (userInput.value != "") {
                let allUsers = userInput.value.split(/\s+/);
                allUsers.push(actualUser);
                socket.send("New private contact;" + allUsers);
                window.remove();
            } else {
                customAlert(2, "Please provide username");
            }
        });
    });
    //Connect other elements
    document.body.appendChild(window);
}