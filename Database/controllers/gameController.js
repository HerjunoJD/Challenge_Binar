const { master_room, user_in_room } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
    //Barisan koding ini digunakan untuk membuat room untuk bermain
    createRoom: async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            setTimeout(res.redirect('/game/gameCreateroom'), 1000)
            return res.status(400).json({errors : errors.array()})
        }
        //Bagian ini digunakan untuk menciptakan kode unik secara acak
        let randomroom = Math.floor(Math.random() * 100);
        let uniquecode = randomroom + req.body.room_name[1] + req.body.room_name[Math.floor(Math.random() * 3)] + req.body.room_name[1];
        //Bagian ini membuat data room ke database
        await master_room.create({
            room_name: req.body.room_name,
            unique_code: uniquecode,
            id_player_1: req.user.dataValues.id
        })
        .then(result => {
            //Bagian ini membuat data yang menampung pilihan suit dari player ke database
            user_in_room.create({
                room_id : result.id,
                room_name : result.room_name,
                player_1_choice : null,
                player_2_choice : null
            })
            res.render('game/gameCreateRoomSuccess', {uniquecode, room_id: result.id})
    })
    },

    //Barisan koding ini untuk mengkonfirmasi kode unik agar tidak sembarang user bisa masuk
    validationRoom: async(req, res) => {
        //Ngecek unique code sama id player
        await master_room.findOne({where : {id : req.params.id}})
        .then(result => {
            //Kondisi ini memeriksa apakah kode unik yang dimasukkan benar atau salah
            if(result.unique_code != req.body.unique_code){
                return res.status(400).json({code: 400, message: 'Kode yang anda masukkan salah'})
            }
            //Kondisi ini menambahkan id dari player kedua ke database
            //Karena id player pertama sudah ikut masuk ke database ketika membuat room
            //Maka hanya perlu memasukkan id player kedua
            else if(req.user.dataValues.id != result.id_player_1 && result.id_player_2 == null && result.unique_code == req.body.unique_code){
                master_room.update(
                    {id_player_2: req.user.dataValues.id},
                    {where: {id: req.params.id}}
                    )
                res.redirect('../rpsroom/' + req.params.id);
            }
            //Kondisi ini memeriksa apakah yang masuk adalah player pertama atau player kedua
            //Secara tidak langsung melarang masuknya user lain yang bukan player pertama maupun player kedua
            else if((result.id_player_1 == req.user.dataValues.id || result.id_player_2 == req.user.dataValues.id) && result.unique_code == req.body.unique_code){
                res.redirect('../rpsroom/' + req.params.id);
            }
            else{
                return res.status(400).json({code: 400, message: 'Room yang anda pilih sudah penuh'})
            }
        })
    },

    //Barisan kode ini digunakan untuk menampilkan halaman validasi
    validationRoomVisual: async(req, res) => {
        await master_room.findOne({where : {id : req.params.id}})
        .then(result => 
            res.render('game/gameRoomValidation', {id:result.id})
            )
    },

    //Barisan kode ini digunakan untuk menampilkan halaman suit
    rpsFightVisual: async(req, res) => {
        await master_room.findOne({where : {id : req.params.id}})
        .then(result => {
            if(req.user.dataValues.id == result.id_player_1){
                res.render('game/gameRoomPlayer1', {room_id:req.params.id})
            } else if (req.user.dataValues.id == result.id_player_2){
                res.render('game/gameRoomPlayer2', {room_id:req.params.id})
            } else {
                res.redirect('/dashboard')
            }
        })
    },

    //Barisan kode ini digunakan untuk mensimulasikan permainan suit
    //Tetapi masih work in progress
    rpsFight: async(req, res) => {
        await master_room.findOne({where : {id : req.params.id}})
        .then(result => {
            if(req.user.dataValues.id == result.id_player_1){
                user_in_room.update(
                    {player_1_choice : req.body.player_1_choice},
                    {where : {room_id : req.params.id}}
                )
            } else if(req.user.dataValues.id == result.id_player_2){
                user_in_room.update(
                    {player_2_choice : req.body.player_2_choice},
                    {where : {room_id : req.params.id}}
                )
            }
        })
            // if(req.user.dataValues.id == result.id_player_1 && player_2_choice == null){
            //     user_in_room.update(
            //         {player_1_choice : null},
            //         {where: {id : req.params.id}}
            //         )
            // }
            // else if(req.user.dataValues.id == result.id_player_2 && player_1_choice == null){
            //     //???
            // }
            // else if(req.user.dataValues.id == result.id_player_1 && player_2_choice != null){
            //     //next
            // }
            // else if(req.user.dataValues.id == result.id_player_2 && player_2_choice != null){
            //     //next
            // }
        
    }
}