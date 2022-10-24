const express = require('express');

const router = express.Router();

const TeamController = require('../controllers/Team.controller');

router.get('/', TeamController.findAll);

router.post('/create', TeamController.create);

module.exports = router;
