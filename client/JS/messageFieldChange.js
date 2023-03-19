const messageField = document.getElementById("MessageField");
let messageHeight = messageField.clientHeight;
function messageChange() {
    messageField.addEventListener("keypress", function() {
        console.log("Check");
        if (messageField.clientHeight > messageHeight) {
            console.log("Ahuenno");
        }
        messageHeight = messageField.clientHeight;
    })
}
messageChange();

