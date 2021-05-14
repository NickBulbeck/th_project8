var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// connection test
const sequelize = require('./models/index.js').sequelize;
const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successfully authenticated ${sequelize.options.storage}`);
  } catch (error) {
    console.log(`Failed to authenticate: ${error.status}, ${error.message}`);
  }
  try {
    await sequelize.sync({force:false});
    console.log(`sync() performed`);
  } catch (error) {
    console.log(`Failed to sync: ${error.status}, ${error.message}`);
  }
}
authenticate();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
