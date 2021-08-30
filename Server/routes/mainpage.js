var express = require('express');
var router = express.Router();

//Halaman Utama
router.get('/', function(req, res, next) {
  res.render('mainpage');
});

module.exports = router;