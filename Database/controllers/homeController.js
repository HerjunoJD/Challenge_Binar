const {user_game, user_game_biodata} = require('../models');
const passport = require('../lib/passport');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

module.exports = {
    register: async (req, res) => {
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
        }});
        //Jika ada username/email yang sama dengan di database maka pesan error akan muncul
        if(data){
            return res.status(400).json({message : "Username atau email yang anda masukkan sudah dipakai"})
        }
        //Baris ini digunakan untuk menciptakan data user ke database user_game
        bcrypt.hash(req.body.password, 10, function(err, hash){
            user_game.create({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            isAdmin: false
            })
            //Baris ini digunakan untuk kemudian menambah data biodata user ke database user_game_biodata
            .then(result => {
                user_game_biodata.create({
                address: null,
                phone_number: null,
                name: null,
                user_game_id: result.id,
                date_of_birth: null
            })
            .then(res.status(201).json({code: 201, message: 'Data telah dimasukkan ke dalam database'}))
            })
            .catch(err => res.render('error'))
        })
    },
    login: passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
}