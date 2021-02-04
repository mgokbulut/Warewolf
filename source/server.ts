import http from 'http';
import url from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';
import lobbyRoutes from './routes/lobby';
import indexRoutes from './routes/index';
// import gameRoutes from './routes/game';
import wss from './routes/game';

const NAMESPACE = 'Server';
const router = express();

/** View engine setup */
console.log(__dirname);
// router.set('views', path.join(__dirname, 'views'));
// router.set('view engine', 'ejs');

/** Use public folder for static files */
router.use(express.static(path.join(__dirname, 'public')));

/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, NAMESPACE);

    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/api/sample', sampleRoutes);
router.use('/lobby', lobbyRoutes);
router.use('/', indexRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

/** Socket Connection */
httpServer.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/game') {
        // !!! Check the authorization header before upgrading the connection: server.ts
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    }
});
