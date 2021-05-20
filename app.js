var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes setup
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
const cookieRouter = require('./routes/cookie.js');

var app = express();
// connection test
const testConnection = require('./scripts/authenticate.js').testConnection;
testConnection();

// end connection test

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// test the non-404 error handler
const errorRouter = require('./routes/errors.js');
app.use('/error', errorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const message = `Sorry! It seems you're looking for ${req.url}, but this page does not exist.`
  next(createError(404,message));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.locals.title = err.status === 404 ? 'Page not found' : 'AAARGH! Server Error...';
  if (err.status === 404) {
    res.render('not-found');
  } else {
    res.render('error');
  }
});

module.exports = app;
