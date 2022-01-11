var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes setup
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
const searchRouter = require('./routes/search.js');
const cookieRouter = require('./routes/cookie.js');

var app = express();
// connection test
const testConnection = require('./scripts/authenticate.js').testConnection;
testConnection();

// end connection test

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static',express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/search', searchRouter);

// dummy route to test the non-404 error handler
const errorRouter = require('./routes/errors.js');
app.use('/error', errorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const message = `Hmm. It seems you're looking for ${req.url}, but this page does not exist.`
  next(createError(404,message));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const locals = {};
  locals.message = `Error status ${err.status}: ${err.message}`;
  locals.status = err.status || 500;
  locals.image = err.status === 404 ? 7 : 11; // Ochils or Ladhar Bheinn
  locals.error = req.app.get('env') === 'development' ? err : {}; // Not used yet , so probably
  locals.colourScheme = 'error';                                  // shouldnae be here!
  locals.heading = err.status === 404 ? 'Page not found' : `AAARGH! Server Error... we're doomed! DOOMED, I TELL YOU!!`;
  res.status(err.status || 500);
  locals.jsFiles = ["redirect"];
  if (err.status === 404) {
    res.render('not-found',locals);
  } else {
    res.render('error',locals);
  }
});

module.exports = app;
