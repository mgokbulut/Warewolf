import express from 'express';
import controller from '../controllers/sample';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);
router.get('/wang', (req, res) => {
    res.render('index');
});

export = router;
