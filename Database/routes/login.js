var express = require('express');
const { get } = require('.');
const {user_game} = require('../models');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login');
})

router.post(
    '/',
    body('username').notEmpty().withMessage('Username tidak boleh kosong'),
    body('password').notEmpty().withMessage('Password tidak boleh kosong'),
    async (req, res) => {
      const errors = validationResult(req);
      //Variabel ini digunakan untuk memeriksa apakah sudah ada token dari login atau tidak
      const cekLogin = localStorage.getItem('loginDatabase');
      if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
      }
      //Baris ini digunakan untuk mencari username di database
      const checkPassword = await user_game.findOne({where: {
          username: req.body.username
      }})

      //Baris ini digunakan untuk memeriksa password yang disubmit oleh user dan password di database
      bcrypt.compare(req.body.password, checkPassword.password).then(result => {
        //Jika password sudah benar tapi belum memiliki token maka akan diberikan token
        if(result && cekLogin == null){
            localStorage.setItem('loginDatabase', 'Access')
            return res.status(200).json({message: 'Anda telah berhasil melakukan login'})
        }
        //Jika password sudah benar dan sudah memiliki token, maka akan dipersilahkan saja
        else if(result && cekLogin == 'Access'){
            return res.status(200).json({message: 'Anda telah berhasil melakukan login'})
        }
        //Jika password salah maka akan diberikan pesan bahwa username atau password yang dimasukkan salah
        else{
            return res.status(401).json({message: 'Username atau password yang anda masukkan salah. Silahkan coba lagi'})
        }
      }).catch(err => console.error(err.message));
});

module.exports = router;
