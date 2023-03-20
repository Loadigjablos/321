const testGroup = [
    {
        "name": "BusidoChat",
        "members": [
            "Levan", "Mat", "Streit"
        ]
    },
    {
        "name": "Developers",
        "members": [
            "Kor", "Mat", "Mor"
        ]
    }
]
function contactList(allGroups) {
    const contactList = document.getElementById("contactList");
    for (let i = 0; i < allGroups.length; i++) {
        for (let j = 0; j < allGroups[i].members.length; j++) {
            if (allGroups[i].members[j].includes(('; '+document.cookie).split(`; username=`).pop().split(';')[0])) {
                createContact(allGroups[i]);
            }
        }
    }
}
function createContact(group) {
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
    contactMembers.innerText = group.members.length + " members";
    //Image
    avatarImage.src = "../materials/logoTest.png";
    //Connect all elements
    avatar.appendChild(avatarImage);
    contact.appendChild(avatar);
    contactInformation.appendChild(contactName);
    contactInformation.appendChild(contactMembers);
    contact.appendChild(contactInformation);
    contactList.appendChild(contact);
}
contactList(testGroup);