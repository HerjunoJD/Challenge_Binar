var express = require('express');
var router = express.Router();

//Database user
let userData = [
  {"id": 1, "username": "Admin", "password": "Administrator", "token": "token_admin"},
  {"id": 2, "username": "Ujang", "password": "Testersejati", "token": "token_user"}
];


// Mengakses database user
router.get('/', function(req, res, next) {
  res.status(200).json({
    'status' : 200,
    'message' : "Berhasil",
    'data' : userData
  })
});

//Testing login
router.post('/login', function(req, res, next){
  let i = 0;
  userData.map((item, index) => {    
    if(item.username === req.body.username && item.password === req.body.password){
      res.status(200).json({
        "message" : "Login Berhasil!",
        "token" : item.token
      });
      return i = 1;
    }
  })
  // Kondisi if di bawah digunakan untuk memastikan request tidak dikirim dua kali
  // agar error http headers sent tidak terjadi
  if(i == 0){
    res.status(400).json({
      "message" : "Login tidak berhasil, silahkan cek kembali username atau password yang anda gunakan"
    });
  } else { next(); }
});

//Membuat akun
router.post('/signup', function(req, res, next){
  let user = {"id": userData.length + 1, "username": null, "password": null, "token": "token_user"};
  if(!req.body.username || !req.body.password){
    res.status(400).json({
      "message" : "Mohon masukkan username dan password terlebih dahulu"
    })
    return;
  }
  userData.push(Object.assign(user, req.body));
  res.redirect('/');
});

//Delete akun
router.delete('/:id', (req, res, next) => {
  for(let i = 0; i < userData.length; i++){
      if(userData[i].id == req.params.id){
          res.send({
              'status' : 'success',
              'message' : 'Akun telah dihapus'
          });
          userData.splice(i, 1);
      }
  }
});

module.exports = router;