'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();

var userType = 0;

var generalUser = require('./generalUser'),
    headerUser = require('./headerUser'),
    boardUser = require('./boardUser'),
    advisorUser = require('./advisorUser'),
    adminUser = require('./adminUser');

//EDIT - login form
router.get('/login', function (req, res) {
    res.render('login', { title: 'Express' }); //code EJS to use h1 with id: title as the title
});
//UPDATE - logic to redirect users to their respective places
router.post('/login', function (req, res) {
    //logic - identify what type of user -> then adapt to the type of user
    //example: if base user, redirect to base user profile and privileges... etc.    

    //how to identify difference between each user:
        //create a variable (userType) and iterate through it using if else statement

    
    if (userType === generalUser) {
        app.use('/:id', generalUser);
    }
    else if (userType === generalUser) {
        app.use('/:id', headerUser);
    }
    else if (userType === generalUser) {
        app.use('/:id', boardUser);
    }
    else if (userType === generalUser) {
        app.use('/:id', advisorUser);
    }
    else if (userType === generalUser) {
        app.use('/:id', adminUser);
    }
    else {
        //error mssg
    }

});
//show - register page
router.get('/register', function (req, res) {
    res.send('this is the get register route');
});
//post - register information
router.post('/register', function (req, res) {
    res.send('this is the post register route');
    //req.body.username
    //req.body.password
    //req.body.firstName
});

module.exports = router;
