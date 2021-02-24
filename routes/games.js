var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

/* GET and create scores for a specific game */
router.get('/', gameController.getUsersGames);
router.get('/:id', gameController.getGame);
router.post('/', gameController.createGame);

module.exports = router;

