const express = require('express');
const router = express.Router();
const createError = require('http-errors');

/* GET error test url */
router.get('/', (req,res,next) => {
  const error = new Error("Testing the basic '/error' route...");
  next(error);
});


router.get('/:status', (req, res, next) => {
    const stat = req.params.status;
    console.log("Input status: ", stat);
  if (stat) {
    next(createError(stat,`${stat}-type bother has arisen in a strange manner...`));
  } else {
    // Not sure how execution would actually reach here... hence the status
    next(createError(666,"Bother has arisen in a VERY strange manner..."));
  }

});

module.exports = router;