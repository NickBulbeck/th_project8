const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const counter = require('../scripts/counter.js').counter();


const asyncHandler = require('../scripts/asyncHandler').asyncHandler;

router.post('/quick', async (req,res,next) => {
  const searchText = req.body.search;
  if (searchText === "") {
    res.redirect('/'); 
  }
  const Book = require('../models').Book;
  const { Op } = require("sequelize");
  const searchResults = await Book.findAll({
    where: {
      [Op.or]: [
        { author: {
          [Op.like] : `%${searchText}%`
        } },
        { title: {
          [Op.like] : `%${searchText}%`
        } },
        { genre: {
          [Op.like] : `%${searchText}%`
        } },
        { year: {
          [Op.like] : `%${searchText}%`
        } },
      ]
    }
  });
  const locals = {};
  const imageNumber = counter()
  locals.image = imageNumber;
  const descriptions = require('../public/images/imageAlt.json').descriptions;
  const imageAlt = descriptions[imageNumber];
  locals.heading = `Nick's Wee Bookstore`;
  locals.subtitle = `Below is a list of all books matching the search text '${searchText}'. The background is ${imageAlt}. Click `;
  locals.colourScheme = 'home';
  const books = [];
  searchResults.forEach( book => {
    const bookAttributes = {};
    for (attribute in book.dataValues) {
      bookAttributes[attribute] = book.dataValues[attribute];
    }
    books.push(bookAttributes);
  })
  locals.books = books; 
  locals.jsFiles = ["indexPage","toggleHighlands"];
  if (searchResults.length === 0) {
    locals.colourScheme = 'search';
    locals.subtitle = `Regrettably, there were no books matching the search text '${searchText}'.
                       Instead, you can admire the background, which is ${imageAlt}.`;
    res.render('emptySearch',locals);
  } else {
    res.render('index',locals);
  }
});

router.post('/advanced',(req,res,next) => {
  console.log("Advanced search route working");
  console.log("This code shouldn't be here until you actually do something with it.");
  res.redirect('/');
});

module.exports = router;