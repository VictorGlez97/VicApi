
const express = require('express');

const router = express.Router();

const BankController = require('../controllers/Bank.controller');

router.post('/create', BankController.create);

module.exports = router;
