const {user_game, user_game_biodata, user_game_history} = require('../models');

module.exports = {
    //Barisan koding ini digunakan untuk menampilkan biodata dari user
    biodata: async(req, res) => {
        await user_game.findOne({
            where: {id: req.params.id},
            include: [{model: user_game_biodata, as: 'user_biodata'}]
        })
        .then(user => {
            res.render('users/biodataUser', {user});
        })
    },

    // Barisan koding ini digunakan untuk menampilkan sejarah permainan user
    history: async(req, res) => {
        await user_game.findOne({
            where: {id: req.params.id},
            include: [{model: user_game_history, as: 'user_history'}]
        })
        .then(user => {
            res.render('users/historyUser', {user});
        })
    },

    //Barisan koding ini digunakan untuk mengupdate biodata user
    dataUpdate: async(req,res) => {
        user_game_biodata.update({
            name: req.body.name,
            address: req.body.address,
            phone_number: req.body.phone_number,
            date_of_birth: req.body.date_of_birth
        }, 
        //Bagian ini mencari id user yang biodatanya akan dirubah
        {where: {user_game_id : req.params.id}})
        .then(res.status(201).json({'message' : 'Biodata telah berhasil diubah'}))
    }
}