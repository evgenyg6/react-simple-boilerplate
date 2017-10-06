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

let userCount = 0;

// Convers back to JSON an dbroadcasts it back to users
function broadcastMessage(message) {
    for (let client of wss.clients) {
        client.send(JSON.stringify(message));
    }
}
// Recieves message, parses it and adds a UUID
function handleMessage(message) {
    var uUid = uuidv1();
    message = JSON.parse(message);
    let msg = {
        id: uUid,
        type: message.type,
        username: message.username,
        content: message.content,
        oldUsername: message.oldUsername,
        userCount: userCount,
        isConnected: 'User has connected.',
        isDisconnected: 'User has disconnected.'
    }
    broadcastMessage(msg);
};


wss.on('connection', (client) => {
    console.log('Client connected.');
    var uUid = uuidv1();
    userCount++; //increase userCount on connect
    let onlineUsers = {
        id: uUid,
        userCount: userCount,
        isConnected: 'User has connected.'
    }

    broadcastMessage(onlineUsers);

    client.on('message', handleMessage);
    //On connection close, reduce user count by 1, broadcast it
    client.on('close', () => {
        var uUid2 = uuidv1();
        console.log('Client disconnected.');
        userCount--;
        let onlineUsers = {
            id: uUid2,
            userCount: userCount,
            isDisconnected: 'User has disconnected.'
        }
        broadcastMessage(onlineUsers);

    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
});