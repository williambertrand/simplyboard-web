var express = require('express');
var router = express.Router();
var roomController = require('../controllers/roomController');

/* GET and create scores for a specific game */
router.get('/:gameId', roomController.listRoomsForGame);
router.post('/:gameId', roomController.createRoomForGame);
router.post('/:gameId/ping', roomController.pingRoom);

module.exports = router;

