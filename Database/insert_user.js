//Javascript ini digunakan untuk mengetes fungsi menambahkan user ke database
const { user_game } = require('./models')

user_game.create({
    username: 'Admin',
    password: "Administrator",
    email: "owner@email.com"
   })
    .then(result => {
      console.log(result)
})