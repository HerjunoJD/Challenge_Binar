var express = require('express');
var router = express.Router();

//Halaman Suit
router.get('/', function(req, res, next) {
  res.render('gamesuit');
});

module.exports = router;