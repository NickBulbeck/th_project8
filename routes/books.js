var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const asyncHandler = require('../scripts/asyncHandler').asyncHandler;

router.get('/new', async function(req,res,next) {
  let locals = {};
  locals.image = (Math.floor(Math.random() * 12) + 1);
  locals.title = "";
  locals.author = "";
  locals.year = "";
  locals.genre = "";
  locals.submitLabel = "Create book";
  locals.heading = "Enter book details";
  locals.action = "/books/new";
  res.render('new-book',locals);
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
    locals.image = (Math.floor(Math.random() * 12) + 1);
    locals.id = book.dataValues.id;
    locals.title = book.dataValues.title;
    locals.author = book.dataValues.author;
    locals.genre = book.dataValues.genre;
    locals.year = book.dataValues.year;
    locals.submitLabel = "Save changes";
    locals.jsFile = "updatePage";
    locals.heading = `View or update details for '${locals.title}'`;
    locals.action = `/books/${book.dataValues.id}`;
    // res.render('new-update-book',locals);
    res.render('update-book',locals);
  } else {
    const message = `It seems you were looking for book number ${id}; but there are only ${total} books.`;
    next(createError(404,message));
  }
})

router.post('/new', async function(req,res,next) {
  const sortErrors = require('../scripts/saveErrors.js').sortErrors
  const Book = require('../models').Book;
  try {
    const book = await Book.create(req.body);
    res.redirect('/');
  } catch(error) {
    const errors = sortErrors(error.message);
    if (errors.dbError) {
      next(createError(500,`An error occurred with the database. ${errors.dbErrors}`));
    } else {
      const locals = {...req.body};
      locals.image = (Math.floor(Math.random() * 12) + 1);
      locals.errors = errors.inputErrors;
      locals.submitLabel = "Create book";
      locals.heading = "Enter book details";
      locals.action = "/books/new";
      res.render('new-book',locals);
    }    
  } 
})

router.post('/:id/delete', async function(req,res,next) {
  const Book = require('../models').Book;
  try {
    console.log(`In the delete method for id ${req.params.id}`);
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    console.log(`${book.dataValues.title} deleted`);
    res.redirect("/");
  } catch(error) {
    next(createError(500,`Unable to process change. ${error.message}`));
  }  
})

router.post('/:id', async function(req,res,next) {
  const id = req.params.id;
  // it's req.body.title, .author, .genre, .year here.
  const sortErrors = require('../scripts/saveErrors.js').sortErrors
  const Book = require('../models').Book;
  const book = await Book.findByPk(id);
  try {
    await book.update(req.body);
    res.redirect('/');
  } catch(error) {
    const errors = sortErrors(error.message);
    if (errors.dbError) {
      next(createError(500,`An error occurred with the database. ${errors.dbErrors}`));
    } else {
      const locals = {...req.body};
      locals.image = (Math.floor(Math.random() * 12) + 1);
      locals.errors = errors.inputErrors;
      locals.submitLabel = "Save changes";
      locals.heading = `View or update details for '${locals.title}'`;
      if (locals.title === "") {
        locals.heading = "Very good... now put the title back.";
      }
      locals.action = `/books/${id}`;
      res.render('new-update-book',locals);
    }    
  }
})

module.exports = router;
