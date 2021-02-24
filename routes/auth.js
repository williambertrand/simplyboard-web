var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

//AUTH: TODO
router.post('/login', userController.checkLogin);
router.post('/register', userController.createUser);

module.exports = router;