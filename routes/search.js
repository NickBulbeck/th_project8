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
  locals.image = counter();
  locals.title = `Nick's wee sqlite app`;
  locals.subtitle = 'the Bookstore';
  locals.searchText = searchText;
  if (searchResults.length === 0) {
    res.render('emptySearch',locals);
  }
  const books = [];
  searchResults.forEach( book => {
    const bookAttributes = {};
    for (attribute in book.dataValues) {
      bookAttributes[attribute] = book.dataValues[attribute];
    }
    books.push(bookAttributes);
  })
  
  locals.books = books; 
  locals.jsFile = "indexPage";
  res.render('index',locals);

});

router.post('/advanced',(req,res,next) => {
  console.log("Advanced search route working");
  console.log("This code shouldn't be here until you actually do something with it.");
  res.redirect('/');
});

module.exports = router;