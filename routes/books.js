var express = require('express');
var router = express.Router();
const createError = require('http-errors');

/* GET books listing. */
// router.get('/', async function(req, res, next) {
//   await res.send('"books" route working at a rudimentary level.');
// });

router.get('/new', async function(req,res,next) {
  let locals = {};
  locals.title = "";
  locals.author = "";
  locals.year = "";
  locals.genre = "";
  locals.submitLabel = "Create book";
  locals.heading = "Enter book details";
  await res.render('new-update-book',locals);
})

router.get('/:id', async function(req,res,next) {
  const id = req.params.id;
  if (isNaN(id)) {
    const message = `It seems you were looking for book number "${id}". The operative word here is "number".`;
    next(createError(404,message));
  }
  const Book = require('../models').Book;
  const book = await Book.findByPk(id);
  const allBooks = await Book.findAll(); // There's probably a shortcut for
  const total = allBooks.length;         // this!
  if (book) {
    let locals = {};
    locals.title = book.dataValues.title;
    locals.author = book.dataValues.author;
    locals.genre = book.dataValues.genre;
    locals.year = book.dataValues.year;
    locals.submitLabel = "Save changes";
    locals.heading = `View or update details for '${locals.title}'`
    res.render('new-update-book',locals);
  } else {
    const message = `It seems you were looking for book number ${id}; but there are only ${total} books.`;
    next(createError(404,message));
  }
})

router.post('/new', async function(req,res,next) {
  await console.log("Posting the book to the database...");
  // 
  res.redirect('/');
})

router.post('/:id/delete', async function(req,res,next) {
  await console.log("Deleting the book");
  res.redirect('/');
})

router.post('/:id', async function(req,res,next) {
  await console.log("Updating book information");
  res.redirect('/:id');
})

module.exports = router;
