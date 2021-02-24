var express = require('express');
var router = express.Router();
var scoreController = require('../controllers/scoreController');

/* GET and create scores for a specific game */
router.get('/:gameId', scoreController.listScoresForGame);
router.post('/:gameId', scoreController.createScoreForGame);

module.exports = router;

