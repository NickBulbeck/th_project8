var express = require('express');
var router = express.Router();

const counter = require('../scripts/counter.js').counter();

const asyncHandler = require('../scripts/asyncHandler.js').asyncHandler;

router.get('/',(req,res) => {
  res.redirect('/index');
} )


/* GET home page. */
router.get('/index', async function(req, res, next) {
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
  // locals.image = (Math.floor(Math.random() * 12) + 1);
  locals.image = counter();
  locals.books = books; 
  locals.title = `Nick's wee sqlite app`;
  locals.subtitle = 'the Bookstore';
  locals.jsFile = "indexPage";
  res.render('index',locals);
  // res.json(locals);
});

module.exports = router;
