var express = require('express');
const { get } = require('.');
const {user_game, user_game_biodata, user_game_history} = require('../models');
var router = express.Router();

router.get('/', async (req, res) => {
  const user = await user_game.findAll({
    include : [{model: user_game_biodata, as: 'user_biodata'}]
  })
  res.render('listUser', {user});
});

module.exports = router;
