var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const Book = require('../models').Book;
  const books = await Book.findAll();
  const output = [];
  books.forEach( book => {
    output.push(book.title);
  })
  console.log(output);
  res.json(books);
});

module.exports = router;
