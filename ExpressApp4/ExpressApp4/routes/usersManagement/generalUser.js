'use strict';
var express = require('express');
var router = express.Router();



//PROFILE:

//EDIT - renders the form where the user will update their profile 
    //their profile will determine what events they sign up for, their hours, etc.
router.get('/:id/edit', function (req, res) {
    res.send('where a user edits their profile');
});

//UPDATE - the action that will update the user's edits to the database and redirect the user
/*
router.push(':id/', function (req, res) {
    //code to update database from EDIT form
});
*/




module.exports = router;