var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mainpageRouter = require('./routes/mainpage');
var usersRouter = require('./routes/users');
var gamesuitRouter = require('./routes/gamesuit')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  if(req.path === '/' || req.path == '/users/login' || req.path == '/users/signup'){
    next()
  }
  
  else if(req.path == '/gamesuit'){
    if(req.query.isLogin == 'true'){
      next()
    }
    else {
      res.redirect('/')
    }
  }
  
  else if(req.path == '/users'){
    if(req.headers.authorization == 'Bearer token_admin'){
      next()
    } else {
      res.json({
        'message' : 'Anda tidak memiliki izin untuk menapak di halaman ini'
      })
    }
  }

  else if(req.path == '/users/' + 2){
    next()
  }

  else{
    next(createError(404));
  }
});

app.use('/', mainpageRouter);
app.use('/users', usersRouter);
app.use('/gamesuit', gamesuitRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
