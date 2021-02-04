import express from 'express';
import controller from '../controllers/lobby';

const router = express.Router();

router.post('/create', controller.create);

router.get('/', controller.lobbyPage);

export = router;
