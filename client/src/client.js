var sock = io();

//function for writing events on the ui
function writeEvent(text) {
    var parent = document.querySelector("#events");
    var el = document.createElement("li");
    el.innerHTML = text;

    //adds new node to the document
    parent.appendChild(el);
}

writeEvent("Welcome to RPS");

/*
sock.on("message", (text) => {
  writeEvent(text)
})
*/
sock.on("message", writeEvent)

function onFormSubmitted(e) {
    e.preventDefault();

    var text = document.querySelector("#chat").value;

    //send message to server
    sock.emit("message", text)
}

document.querySelector("#chat-form").addEventListener("submit", onFormSubmitted)

/////////////////////////////////////////
//sending button events to server
document.querySelector("#rock").addEventListener("click", function() {
    var action = "rock"
    sock.emit("turn", action)
});

document.querySelector("#paper").addEventListener("click", function() {
    var action = "paper"
    sock.emit("turn", action)
});

document.querySelector("#scissors").addEventListener("click", function() {
    var action = "scissors"
    sock.emit("turn", action)
});