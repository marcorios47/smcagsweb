'use strict';
var express = require('express');
var router = express.Router();

//NEW - is there anything a header user can create?


//-----------------------------//-----------------------------

//PROFILE
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

//FORM:
//EDIT - the form where the header modifies the headers of ppl who went

//UPDATE - where the header's form is updated

//-----------------------------//-----------------------------

//DELETE - what can a header delte?



module.exports = router;