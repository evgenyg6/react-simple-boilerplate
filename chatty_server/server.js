// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
    server
});

function broadcastMessage(message) {
    for (let client of wss.clients) {
        client.send(JSON.stringify(message));
    }
}

function handleMessage(message) {
    var uUid = uuidv1();
    message = JSON.parse(message);
    console.log("THIS MESSAGE");
    console.log(message.username);
    let msg = {
        id: uUid,
        username: message.username,
        content: message.content
    }
    broadcastMessage(msg);
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
    console.log('Client connected');

    client.on('message', handleMessage);
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    client.on('close', () => console.log('Client disconnected'));
});