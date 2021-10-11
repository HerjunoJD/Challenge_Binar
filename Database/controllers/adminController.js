const {user_game, user_game_biodata} = require('../models');

module.exports = {
    //Barisan koding ini digunakan untuk menampilkan list user yang terdaftar di database
    list: async(req, res) => {
        await user_game.findAll({
            include: [{model: user_game_biodata, as: 'user_biodata'}]
        })
        .then(user =>
            res.render('admin/listUser', {user}))
    },
    //Barisan koding ini digunakan untuk menampilkan halaman biodataUser.ejs
    //Halaman ini digunakan untuk tampil muka dalam mengganti biodata salah satu user di database
    biodata: async(req, res) => {
        await user_game.findOne({
            where: {id: req.params.id},
            include: [{model: user_game_biodata, as: 'user_biodata'}]
        })
        .then(user => {
            res.render('admin/biodataUser', {user});
        })
    },

    erase: async(req, res) => {
        //Barisan koding ini untuk menghilangkan data user yang sudah ada di database
        await user_game.destroy({where : {id: req.params.id}})
                       .then(user_game_biodata.destroy({where : {user_game_id: req.params.id}}))
                       .then(res.status(201).json({code: 201, message: 'Data telah berhasil dihapus'}))
    }
}