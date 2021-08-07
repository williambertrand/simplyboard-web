var express = require('express');
var router = express.Router();
var roomController = require('../controllers/roomController');

/* GET and create scores for a specific game */
router.post('/cycle', roomController.endInactiveGames);
router.get('/:gameId', roomController.listRoomsForGame);
router.post('/:gameId', roomController.createRoomForGame);
router.post('/:roomId/ping', roomController.pingRoom);

module.exports = router;
