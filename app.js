var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var multer = require('multer');
var mongoose = require('mongoose');

global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect('mongodb://localhost:27017/nodedb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000*60*30
  }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');

app.use(function(req,res,next){
  res.locals.user = req.session.user;   // 从session 获取 user对象
  var err = req.session.error;   //获取错误信息
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();  //中间件传递
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer());
app.use(cookieParser());


app.use('/', indexRouter);  // 即为为路径 / 设置路由
app.use('/users', indexRouter); // 即为为路径 /users 设置路由
app.use('/login',indexRouter); // 即为为路径 /login 设置路由
app.use('/register',indexRouter); // 即为为路径 /register 设置路由
app.use('/home',indexRouter); // 即为为路径 /home 设置路由
app.use("/logout",indexRouter); // 即为为路径 /logout 设置路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
