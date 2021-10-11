const router = require('express').Router();
const game = require('../controllers/gameController');
const restrict = require('../middleware/restrict');
const { body } = require('express-validator');

router.get('/createroom', restrict, (req, res) => res.render('game/gameCreateRoom'));
router.post('/createroom', restrict,
            body('room_name').notEmpty().withMessage('Nama room tidak boleh kosong'),
            game.createRoom);
router.get('/roomvalidation/:id', restrict, game.validationRoomVisual);
router.post('/roomvalidation/:id', restrict, game.validationRoom);
router.get('/rpsroom/:id', restrict, game.rpsFightVisual);
router.post('/rpsroom/:id', restrict, game.rpsFight);

module.exports = router;