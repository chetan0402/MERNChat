var express = require('express');
var router = express.Router();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    console.log("new person connected");
    ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({message: msg.message, name: msg.name}));
            }
        });
    });
});

module.exports = router;