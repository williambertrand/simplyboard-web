var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* ADMIN: GET and create users */
router.get('/', userController.listUsers);
router.post('/', userController.createUser);

module.exports = router;

