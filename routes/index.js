var express = require('express');
var router = express.Router();
const constants = require('../constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: constants.APP_TITLE});
});

module.exports = router;
