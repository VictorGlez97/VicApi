const express = require('express');

const router = express.Router();

const GameController = require('../controllers/Game.controller');

router.post('/', GameController.findll);

router.post('/create', GameController.create);

module.exports = router;