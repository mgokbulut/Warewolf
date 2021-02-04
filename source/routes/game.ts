import express from 'express';
import controller from '../controllers/game';
import WebSocket from 'ws';

/** Initialize WebSocket Server */
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    console.log(' CONNECT      !!!!!!!!!! ');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

export default wss;
