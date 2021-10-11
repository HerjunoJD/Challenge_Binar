const router = require('express').Router();
const users = require('../controllers/usersController');
const restrict = require('../middleware/restrict');

router.get('/biodata/:id', restrict, users.biodata);
router.get('/history/:id', restrict, users.history);
router.post('/biodata/:id', restrict, users.dataUpdate)

module.exports = router;