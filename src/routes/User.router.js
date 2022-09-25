const express = require('express');

const router = express.Router();

const UserController = require('../controllers/User.controller');

router.get('/', UserController.findAll);

router.post('/create', UserController.create);

router.post('/login', UserController.login);

router.get('/:id', UserController.findById);

router.delete('/:id', UserController.delete);

// router.put('/:id', UserController.)

module.exports = router;