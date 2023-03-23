function connectToGroup() {
    //Create DOM elements
    const window = document.createElement("div");
    const connectDiv = document.createElement("div");
    const roomName = document.createElement("input");
    const connectLabel = document.createElement("label");
    const connectToChat = document.createElement("button");
    const closeWindow = document.createElement("button");
    //Text
    connectToChat.innerText = "Create"
    connectLabel.innerText = "Group name";
    closeWindow.innerText = "X";
    //Placeholders
    roomName.placeholder = "Enter group name";
    //Design for close alert and shading div
    window.className = "absolute top-[25%] left-[35%] text-black w-[35%] text-[1rem] flex flex-col bg-white justify-center";
    connectDiv.className = "relative flex mb-[1.5rem] h-[3.375rem] cursor-pointer";
    roomName.className = "w-[80%] h-[100%] text-[1.2rem] bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2 m-auto placeholder:text-[1rem]";
    connectLabel.className = "absolute left-[3rem] top-0 text-[1.4rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white";
    connectToChat.className =  "w-auto border-black m-auto text-[1.4rem] rounded-[0.75rem] bg-[rgb(218,33,110)] p-2 mb-2";
    closeWindow.className = "absolute right-2 top-0 text-[2rem] text-red-600 hover:bg-gray-300 z-10";
    //Events
    closeWindow.addEventListener("click", function() {
        window.remove();
    });
    connectToChat.addEventListener("click", function() {
        const allContacts = document.getElementById("contactList").children;
        let checkTrue = 0;
        for (let i = 0; i < testGroup.length; i++) {
            if (roomName.value == testGroup[i].name) {
                for (let j = 0; j < allContacts.length; j++) {
                    if (allContacts[j].children[1].children[0].innerText == roomName.value) {
                        checkTrue = 1;
                        customAlert(1, "You already have this chat");
                        break;
                    }
                }
                if (checkTrue == 0) {
                    createContact(testGroup[i]);
                    break;
                }
            }  
        }
        window.remove();
    });
    //Connect other elements
    window.appendChild(closeWindow);
    connectDiv.appendChild(roomName);
    connectDiv.appendChild(connectLabel);
    window.appendChild(connectDiv);
    window.appendChild(connectToChat);
    document.body.appendChild(window);
}