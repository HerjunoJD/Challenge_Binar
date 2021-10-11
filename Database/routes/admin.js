const router = require('express').Router();
const admin = require('../controllers/adminController');
const restrict = require('../middleware/restrict');
const restrictAdmin = require('../middleware/restrictAdmin');


router.get('/', restrict, restrictAdmin, admin.list);
router.get('/user/:id', restrict, restrictAdmin, admin.biodata);
router.delete('/user/:id', restrict, restrictAdmin, admin.erase);

module.exports = router;