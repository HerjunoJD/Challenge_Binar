var express = require('express');
const {user_game, user_game_history} = require('../models');
var router = express.Router();

// router.get('/:id', async (req, res) => {
//     const user = await user_game_history.findAll({
//         where: {user_game_id: req.params.id},
//         include : [{model: user_game, as: 'user_history'}]
//     })
//     const game = await user_game.findOne({
//         where: {id: req.params.id}
//     })
//     res.render('historyUser', {user}, {game});
//   });

router.get('/:id', async (req, res) => {
    const user = await user_game.findOne({
        where: {id: req.params.id},
        include : [{model: user_game_history, as: 'user_history'}]
    })
    res.render('historyUser', {user});
  });

module.exports = router;