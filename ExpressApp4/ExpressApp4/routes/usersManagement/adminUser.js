'use strict';
var express = require('express');
var router = express.Router();

//NEW - is there anything an admin user can create?

//PROFILE:

//EDIT - renders the form where the user will update their profile
router.get('/:id/edit', function (req, res) {
    res.send('where a user edits their profile');
});

//UPDATE - the action that will update the user's edits to the database and redirect the user
/*
router.push(':id/', function (req, res) {
    //code to update database from EDIT form
});
*/
//-----------------------------//-----------------------------

//OTHER USER:

//SHOW - see list of all users

//NEW - another user

//EDIT - another user

//UPDATE - another user

//DELETE - antoher user

//-----------------------------//-----------------------------

//EVENTS:

//NEW - events

//EDIT - events

//UPDATE - events

//DELETE - events

//-----------------------------//-----------------------------

//DELETE - what can an admin delete?




module.exports = router;