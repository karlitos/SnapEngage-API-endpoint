var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main page with chat app', snapengageMsg: 'Click on the green button to open chat window' });
});

module.exports = router;
