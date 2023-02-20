
const express = require('express');

const router = express.Router();

const GambleController = require('../controllers/Gamble.controller');

router.get('/', GambleController.getByPeriod);

router.post('/', GambleController.create);

router.post('/:id', GambleController.update);

router.delete('/:id', GambleController.delete);

module.exports = router;