
const express = require('express');

const router = express.Router();

const BankController = require('../controllers/Bank.controller');

router.post('/', BankController.create);

module.exports = router;
