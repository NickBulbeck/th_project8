const express = require('express');
const router = express.Router();
const createError = require('http-errors');

/* GET error test url */
router.get('/', (req,res,next) => {
  const error = new Error("Testing the basic '/error' route...");
  error.status = 500;
  next(error);
});


router.get('/:status', (req, res, next) => {
  const stat = parseInt(req.params.status);
  const error = new Error(`${stat}-type bother has arisen in a strange manner...`);
  try {
    error.status = 500;
  } catch {
    error.status = 666;
    error.message = "Bother has arisen in a VERY strange manner..."
  };
  next(error);
});

module.exports = router;