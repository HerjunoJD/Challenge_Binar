const router = require('express').Router();
const home = require('../controllers/homeController');
const { body } = require('express-validator');
const restrict = require('../middleware/restrict');

// router.get('/', home.index);
// router.get('/:id', home.history);

router.get('/', (req, res) => res.render('index'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register',
            body('username').notEmpty().withMessage('Username tidak boleh kosong'),
            body('password').notEmpty().withMessage('Password tidak boleh kosong')
                            .isLength({min : 8}).withMessage('Password minimal menggunakan 8 karakter'),
            body('email').isEmail().withMessage('Format tidak sesuai dengan email'),
            home.register);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', home.login)
router.get('/dashboard', restrict, (req, res) => res.render('dashboard'));

module.exports = router;