var express = require('express');
var router = express.Router();

const counter = require('../scripts/counter.js').counter();

const asyncHandler = require('../scripts/asyncHandler.js').asyncHandler;

// Threw these two in for completeness
router.get('/',(req,res) => {
  res.redirect('/index');
});
router.get('/home',(req,res) => {
  res.redirect('/index');
});
router.get('/index',(req,res) => {
  res.redirect('/books');
});
/* GET home page. */

router.get('/books', asyncHandler(async (req,res,next) => {
  const Book = require('../models').Book;
  const DBbooks = await Book.findAll();
  const locals = {};
  const books = [];
  DBbooks.forEach( book => {
    const bookAttributes = {};
    for (attribute in book.dataValues) {
      bookAttributes[attribute] = book.dataValues[attribute];
    }
    books.push(bookAttributes);
  })
  const imageNumber = counter();
  locals.image = imageNumber;
  const descriptions = require('../public/images/imageAlt.json').descriptions;
  const imageAlt = descriptions[imageNumber]; 
  locals.colourScheme = `home`;
  locals.books = books; 
  locals.heading = `Nick's Wee Bookstore`;
  locals.subtitle = `Welcome to the home page, whose background on this occasion is ${imageAlt}. Click `;
  locals.jsFile = "indexPage";
  res.render('index',locals);
}));

module.exports = router;
