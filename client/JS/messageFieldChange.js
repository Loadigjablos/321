const messageField = document.getElementById("MessageField");
let messageHeight = messageField.clientHeight;
function messageChange() {
    messageField.addEventListener("keyup", function() {
        let windowHeight = document.getElementById("growField").style.height;
        if (messageField.clientHeight > messageHeight) {
            document.getElementById("growField").style.height = (parseFloat(windowHeight) + 1.4 + "rem");;
        } else if (messageField.clientHeight < messageHeight) {
            document.getElementById("growField").style.height = (parseFloat(windowHeight) - 1.4 + "rem");;
        }
        messageHeight = messageField.clientHeight;
    })
}
messageChange();

