import { NextFunction, Request, Response } from 'express';
import WebSocket from 'ws';

/** Initialize WebSocket Server */
const wss = new WebSocket.Server({ noServer: true });
const lobby = [];

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

const create = (req: Request, res: Response, next: NextFunction) => {
    console.log('create function');

    res.render('index');
    // return res.status(200).json({
    //     message: 'pong'
    // });
};

const lobbyPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('lobby');
    // return res.status(200).json({
    //     message: 'pong'
    // });
};

export default { create, lobbyPage };
