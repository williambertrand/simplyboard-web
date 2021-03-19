var express = require('express');
var router = express.Router();
var statController = require('../controllers/statController');

/* GET and create scores for a specific game */
router.get('/:gameId', statController.getStatsForGame);
router.post('/:gameId', statController.submitStatForGame);

module.exports = router;

