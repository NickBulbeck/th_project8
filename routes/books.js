var express = require('express');
var router = express.Router();
const createError = require('http-errors');

const asyncHandler = require('../scripts/asyncHandler').asyncHandler;
const counter = require('../scripts/counter.js').counter();

router.get('/new', async function(req,res,next) {
  let locals = {};
  const imageNumber = counter();
  locals.image = imageNumber;
  const descriptions = require('../public/images/imageAlt.json').descriptions;
  const imageAlt = descriptions[imageNumber]; 
  locals.heading = `Nick's Wee Bookstore`;
  locals.subtitle = `To create a new book, enter the relevant details below. The background image here is ${imageAlt}. Click `;
  locals.colourScheme = `new`;
  locals.title = "";
  locals.author = "";
  locals.year = "";
  locals.genre = "";
  locals.submitLabel = "Create book";
  locals.action = "/books/new";
  locals.jsFiles = ["toggleHighlands"];
  res.render('new-book',locals);
})

router.get('/:id', asyncHandler(async (req,res,next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    const message = `It seems you were looking for book number "${id}". The operative word here is "number". You're welcome.`;
    next(createError(404,message));
  }
  const Book = require('../models').Book;
  const book = await Book.findByPk(id);
  const allBooks = await Book.findAll(); // There's probably a shortcut for
  const total = allBooks.length;         // this!
  if (book) {
    let locals = {};
    const imageNumber = counter();
    locals.image = imageNumber;
    const descriptions = require('../public/images/imageAlt.json').descriptions;
    const imageAlt = descriptions[imageNumber]; 
    locals.colourScheme = `new`;
    locals.id = book.dataValues.id;
    locals.title = book.dataValues.title;
    locals.author = book.dataValues.author;
    locals.genre = book.dataValues.genre;
    locals.year = book.dataValues.year;
    locals.submitLabel = "Save changes";
    locals.colourScheme = `update`;
    locals.jsFiles = ["updatePage","toggleHighlands"];
    locals.subtitle = `To update '${locals.title}', edit the relevant details below. The background image here is ${imageAlt}. Click `;
    locals.heading = `View or update details for '${locals.title}'`;
    locals.action = `/books/${book.dataValues.id}`;
    res.render('update-book',locals);
  } else {
    const message = `It seems you were looking for book number ${id}; but there are only ${total} books.`;
    next(createError(404,message));
  }
}));

router.post('/new', asyncHandler (async (req,res,next) => {
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
      const imageNumber = counter();
      locals.image = imageNumber;
      const descriptions = require('../public/images/imageAlt.json').descriptions;
      const imageAlt = descriptions[imageNumber]; 
      locals.subtitle = `The background image here is ${imageAlt}. Click `;
      locals.colourScheme = `new`;
      locals.errors = errors.inputErrors;
      const errorNoun = errors.inputErrors.length === 1 ? "error" : "errors";
      locals.submitLabel = "Create book";
      locals.heading = "Re-check book details...";
      locals.action = "/books/new";
      locals.jsFiles = ["toggleHighlands"];
      locals.subtitle = `Please note the ${errorNoun} below. The new background image, BTW, is ${imageAlt}. Click `;
      res.render('new-book',locals);
    }    
  } 
}));

router.post('/:id/delete', asyncHandler( async (req,res,next) => {
  const Book = require('../models').Book;
  try {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/");
  } catch(error) {
    next(createError(500,`Unable to delete. ${error.message}`));
  }  
}));

router.post('/:id', asyncHandler( async (req,res,next) => {
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
      locals.colourScheme = `update`;
      const imageNumber = counter();
      locals.image = imageNumber;
      const descriptions = require('../public/images/imageAlt.json').descriptions;
      const imageAlt = descriptions[imageNumber]; 
      locals.subtitle = `The background image here is ${imageAlt}. Click `;
      locals.jsFiles = ["toggleHighlands"];
      const errorNoun = errors.inputErrors.length === 1 ? "error" : "errors";
      const errorVerb = errorNoun === "error" ? "was an" : "were";
      locals.subtitle = `Please note the ${errorNoun} below. The new background image, BTW, is ${imageAlt}. Click `;
      locals.errors = errors.inputErrors;
      locals.submitLabel = "Save changes";
      locals.heading = `There ${errorVerb} ${errorNoun} updating '${locals.title}'`;
      if (locals.title === "") {
        locals.heading = "Very good... now put the title back.";
      }
      locals.action = `/books/${id}`;
      res.render('update-book',locals);
    }    
  }
}));

module.exports = router;
