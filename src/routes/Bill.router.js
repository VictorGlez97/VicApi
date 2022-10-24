const express = require('express');

const router = express.Router();

const BillController = require('../controllers/Bill.controller');

router.post('/', BillController.create);

router.post('/findByPeriod', BillController.findByPeriod);

module.exports = router;

