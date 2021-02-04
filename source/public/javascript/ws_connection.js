console.log('js loaded');
// const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8000/game');

ws.onopen = (ev) => {
    console.log('open called');
    ws.send('something');
};

ws.onmessage = (res) => {
    console.log('message called');
    console.log(res.data);
};
