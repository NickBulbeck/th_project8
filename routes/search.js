const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const createError = require('http-errors');

router.use(bodyParser.urlencoded({extended:false}));

router.post('/quick',(req,res,next) => {
  const searchText = req.body.search;
  console.log(`Quick search route working: ${searchText}`);
  res.redirect('/');
});

router.post('/advanced',(req,res,next) => {
  console.log("Advanced search route working");
  res.redirect('/');
});

module.exports = router;