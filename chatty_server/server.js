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
// Global variable so it may be updated
let userCount = 0;
// Convers back to JSON an dbroadcasts it back to ALL users
function broadcastMessage(message) {
    for (let client of wss.clients) {
        client.send(JSON.stringify(message));
    }
}
// Recieves message, parses it, adds a UUID and sends it to broadcastMessage function
function handleMessage(message) {
    let uUid = uuidv1();
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
    //On connect, increase userCount on connect, broadcast it
    userCount++;
    let uUid = uuidv1();
    let onlineUsers = {
        id: uUid,
        userCount: userCount,
        isConnected: 'User has connected.'
    }
    broadcastMessage(onlineUsers);
    //On message event, run handleMessage function
    client.on('message', handleMessage);

    //On connection close, reduce user count by 1, broadcast it
    client.on('close', () => {
        let uUid2 = uuidv1();
        console.log('Client disconnected.');
        userCount--;
        let onlineUsers = {
            id: uUid2,
            userCount: userCount,
            isDisconnected: 'User has disconnected.'
        }
        broadcastMessage(onlineUsers);
    });
});