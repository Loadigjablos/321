function searchAllContact() {
    const allContacts = document.getElementById("contactList").children;
    const searchField = document.getElementById("searchField");
    const searchInput = document.getElementById("searchInput");
    searchField.innerHTML = "";
    //searchInput.value = "";
    searchField.style.display = "block";
    for (let i = 0; i < allContacts.length; i++) {
        if (searchInput.value == "") {
            const searchedElement = document.createElement("div");
            searchedElement.innerText = allContacts[i].children[1].children[0].innerText;
            searchedElement.className = "relative flex mt-[0.5rem] mb-[0.5rem] ml-[0.25rem] h-auto cursor-pointer";
            searchField.appendChild(searchedElement);
            searchedElement.addEventListener("click", function() {
                allContacts[i].click();
            });
        } else {
            if (allContacts[i].children[1].children[0].innerText.includes(searchInput.value)){
                const searchedElement = document.createElement("div");
                searchedElement.innerText = allContacts[i].children[1].children[0].innerText;
                searchedElement.className = "relative flex mt-[0.5rem] mb-[0.5rem] ml-[0.25rem] h-auto cursor-pointer";
                searchField.appendChild(searchedElement);
                searchedElement.addEventListener("click", function() {
                    allContacts[i].click();
                });
            }
        }
    }
}