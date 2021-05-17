const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// add in any specific functions here
// const setDontPanic = require('../js/cookies).setDontPanic;
// and stuff

router.get('/*',(req,res,next) => {
    // Stuff from every route comes in here
    // test if (req.cookies.set)
})

router.post('/',(req,res) => {
    // Code in here that sets the cookie,
    // and renders the home page
})

router.post('/da',(req,res) => {
    // Code in here that sets up the douglas adams
    // options and then 
    // renders the home page
})

module.exports = router;