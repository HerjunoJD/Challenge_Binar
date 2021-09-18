var express = require('express');
const {user_game, user_game_biodata, user_game_history} = require('../models');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");

//Barisan koding ini digunakan untuk menampilkan halaman addUser.ejs
//Halaman ini digunakan untuk tampil muka dalam menambah data user ke database
router.get('/', function(req, res){ 
  res.render('addUser');
})

//Barisan koding ini digunakan untuk menampilkan halaman biodataUser.ejs
//Halaman ini digunakan untuk tampil muka dalam mengganti biodata salah satu user di database
router.get('/:id', async(req, res) => { 
  res.render('biodataUser');
  const updateUser = await user_game.findOne({where : {id: req.params.id}});
})

//Barisan koding ini untuk menambah data user baru ke database
router.post(
  '/',
  body('username').notEmpty().withMessage('Username tidak boleh kosong'),
  body('password').notEmpty().withMessage('Password tidak boleh kosong')
                  .isLength({min : 8}).withMessage('Password minimal menggunakan 8 karakter'),
  body('email').isEmail().withMessage('Format tidak sesuai dengan email'),
  async (req, res) => {  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()})
    }

    //Bagian ini mencari apakah username atau email yang digunakan sudah ada di database atau belum
    const data = await user_game.findOne({where : {
      [Op.or]: [
        {username: req.body.username},
        {email: req.body.email}
      ]
    }
    });

    //Jika ada username/email yang sama dengan di database maka pesan error akan muncul
    if(data){
      return res.status(400).json({message: 'Username atau email yang anda masukkan sudah dipakai'})
    }

    //Baris ini digunakan untuk menciptakan data user ke database user_game
    bcrypt.hash(req.body.password, 10, function(err, hash){
      user_game.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
       })
       //Baris ini digunakan untuk kemudian menambah data biodata user ke database user_game_biodata
       .then(result => {
         user_game_biodata.create({
           address: req.body.address,
           phone_number: req.body.phone_number,
           name: req.body.name,
           user_game_id: result.id,
           date_of_birth: req.body.date_of_birth
         })
         return res.status(201).json({code: 201, message: 'Data telah dimasukkan ke dalam database'})
       })
    })
});

//Barisan koding ini untuk menghilangkan data user yang sudah ada di database
router.delete('/:id', async(req, res) => {
  const deleteUser = await user_game.destroy({where : {id: req.params.id}});

  //Bagian if ini ada untuk mencegah penghapusan data yang sudah dihapus atau memang tidak ada
  if(!deleteUser){
    return res.status(400).json({message: 'Data user yang akan dihapus tidak ada'});
  }
  return res.status(201).json({code: 201, message: 'Data telah berhasil dihapus'});
})

//Barisan koding ini untuk mengganti data user yang sudah ada di database
router.post('/:id', async(req, res) => {
  user_game_biodata.update({
    name: req.body.name,
    address: req.body.address,
    phone_number: req.body.phone_number,
    date_of_birth: req.body.date_of_birth
  }, 
  //Bagian ini mencari id user yang biodatanya akan dirubah
  {
    where: {user_game_id : req.params.id}
  })
  .then(result => {
    res.status(201).json({'message' : 'Biodata telah berhasil diubah'});
  })
})



module.exports = router;