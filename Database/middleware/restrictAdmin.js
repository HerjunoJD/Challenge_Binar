//Middleware ini digunakan untuk memeriksa apakah user yang aktif adalah seorang admin atau bukan
//Jika iya, maka user tersebut dapat memasuki halaman-halaman yang direstriksi oleh "restrictAdmin"
module.exports = (req, res, next) => {
    if(req.user.dataValues.isAdmin === true)
    return next()
    res.redirect('/login')
}