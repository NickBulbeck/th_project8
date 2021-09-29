const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const counter = require('../scripts/counter.js').counter();

router.use(bodyParser.urlencoded({extended:false}));

const asyncHandler = (cb) => {
  return async (req,res,next) => {
    try {
      await cb(req,res,next);
    } catch(error) {
      next(error);
    }
  }
}

router.post('/quick', async (req,res,next) => {
  const searchText = req.body.search;
  console.log(`Quick search route working: ${searchText}`);
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
      ]
    }
  });
  const locals = {};
  const books = [];
  searchResults.forEach( book => {
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
  locals.jsFile = "homePage";
  res.render('index',locals);

  // res.redirect('/');
});

router.post('/advanced',(req,res,next) => {
  console.log("Advanced search route working");
  res.redirect('/');
});

module.exports = router;