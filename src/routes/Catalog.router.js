const express = require('express');

const router = express.Router();

const CatalogController = require('../controllers/Catalog.controller');

router.post('/', CatalogController.create);

router.get('/:module/:section', CatalogController.find);

module.exports = router;
