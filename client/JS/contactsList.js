let testGroup = [];
let testUserList = [];

function GetAllContactsRequest() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/AllMessages");
    request.onreadystatechange = function() {
        onRequstUpdate(event);
    };
    request.send();
}

function onRequstUpdate(event) {   
    if (request.readyState < 4) {
        return;
    }
    if (request.status == 200 || request.status == 201) {
        testGroup = JSON.parse(request.responseText);
        testUserList = testGroup[0].users;
        for (let i = 0; i < testGroup.length; i++) {
            for (let j = 0; j < testGroup[i].members.length; j++) {
                if (testGroup[i].members[j].includes(actualUser)) {
                    createContact(testGroup[i]);
                }
            }
        }
        const contactList = document.getElementById("contactList");
        contactList.firstChild.click();
    } else {
        customAlert(1, "Unable To Get Any Data");
    }
}

function createContact(group, contactType = 0) {
    //Create DOM elements
    const contactList = document.getElementById("contactList");
    const contact = document.createElement("div");
    const avatar = document.createElement("div");
    const avatarImage = document.createElement("IMG");
    const contactInformation = document.createElement("div");
    const contactName = document.createElement("div");
    const contactMembers = document.createElement("div");
    //Design for this elements
    contact.className = "w-[100%] p-[0.8rem] flex cursor-pointer";
    avatar.className = "flex items-center w-[2.5rem] h-[2.5rem] mr-[0.625rem]";
    avatarImage.className = "w-[100%] h-[100%] rounded-[50%] border-2";
    contactInformation.className = "flex flex-col justify-center";
    contactName.className = "flex items-center text-[1.125rem] leading-[1.375rem] font-bold";
    contactMembers.className = "text-[0.875rem] leading-[1.375rem]";
    //Text for elements
    contactName.innerText = group.name;
    if (contactType === 0) {
        contactMembers.innerText = group.members.length + " members";
    } else {
        contactMembers.innerText = "Private contact";
    }
    //Image
    avatarImage.src = "../materials/logoTest.png";
    //Connect all elements
    avatar.appendChild(avatarImage);
    contact.appendChild(avatar);
    contactInformation.appendChild(contactName);
    contactInformation.appendChild(contactMembers);
    contact.appendChild(contactInformation);
    contactList.appendChild(contact);
    //Add function
    contact.addEventListener("click", function() {
        actualChat = group.name;
        showGroup(group, contactType);
    });
}

function showList() {
    const dropList = document.getElementById("dropList");
    dropList.style.display = "block";
}
function hideList() {
    const dropList = document.getElementById("dropList");
    const searchField = document.getElementById("searchField");
    dropList.style.display = "none";
    searchField.style.display = "none";
}

