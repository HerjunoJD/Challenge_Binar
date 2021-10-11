//Middleware ini digunakan untuk memeriksa apakah pihak yang masuk ke halaman adalah user atau bukan
//Jika iya, maka user tersebut dapat memasuki halaman-halaman yang direstriksi oleh "restrict"
//Jika tidak, dia akan ditendang kembali ke halaman login
module.exports = (req, res, next) => {
    if(req.isAuthenticated())
    return next()
    res.redirect('/login')
}