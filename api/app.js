var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index").sequelize
var temperature = require("./src/fetchfunction/fetchTemperature")
var wind = require("./src/fetchfunction/fetchWind")
var humidity = require("./src/fetchfunction/fetchHumidity")
var cors = require('cors');

var indexRouter = require('./routes/index');
var passport = require('passport')

var app = express();
var session    = require('express-session')
var passport = require('passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require("./src/PassportConfig")
app.use(cors());
app.use('/', indexRouter);

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

//C'est déguelasse mais ça me soule et sinon ça marche pas 
function recursiveFetch()
{
  temperature();
  setTimeout(wind,10000)
  setTimeout(humidity,20000)
  setTimeout(recursiveFetch,60000)
}
recursiveFetch();



module.exports = app;


