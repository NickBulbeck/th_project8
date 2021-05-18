const express = require('express');
const router = express.Router();
const createError = require('http-errors');

/* GET error test url */
router.get('/:status', (req, res, next) => {
    const stat = req.params.status;
    console.log("Input status: ", stat);
  if (stat) {
    next(createError(stat,`${stat}-type bother has arisen in a strange manner...`));
  } else {
    next(createError(401,"Bother has arisen in a strange manner..."));
  }
});

module.exports = router;