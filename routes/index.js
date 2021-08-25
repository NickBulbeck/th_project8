var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', async function(req, res, next) {
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
  locals.books = books;
  locals.title = `Nick's wee sqlite app`;
  locals.subtitle = 'the Bookstore';
  res.render('index',locals);
  // res.json(locals);
});

module.exports = router;
