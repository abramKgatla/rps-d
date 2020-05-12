//cd server
//npm init -y
//npm install express
//npm install socket.io
//npm install nodemon --save -dev       --only=dev     used to avoid rebooting after every single change during development

//declare modules
const http = require("http");
const express = require("express")
const socketio = require("socket.io")

//import class from rps-game.js
const RpsGame = require("./rps-game")

//declare framework
var app = express();

//upload filePath
var clientPath = `${__dirname}/client`;
console.log(`Serving static from ${clientPath}`)

//add static middle ware
app.use(express.static(clientPath));

//create server
var server = http.createServer(app);

//add socket.io 
var io = socketio(server)

var waitingPlayer = null;

//add socket event listner
io.on("connection", (sock) => {
    console.log("Someone is connected")
    if (waitingPlayer) {
        //start game
        new RpsGame(waitingPlayer, sock);

        //then reset waiting playerback to zero
        waitingPlayer = null;

    } else {
        waitingPlayer = sock;
        //send message to waiting player
        waitingPlayer.emit("message", "Please wait for an opponent...")

    }

    //listen for message from a client, then send it to all the orther connected clients
    sock.on("message", (text) => {
        io.emit("message", text);
    })
});

//error handling event listener
server.on("error", (err) => {
    console.log("Server Error", err)
})

var port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`RPS started on port ${port}`)
});

//npm start    to start the server
//npm run dev   after adding nodemon to package.json to scripts