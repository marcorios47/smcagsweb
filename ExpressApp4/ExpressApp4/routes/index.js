'use strict';
var express = require('express');
var router = express.Router();
var url = require('url'); //used to pass information through two pages
// Import Admin SDK
var admin = require("firebase-admin");
var db = admin.database();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
//------------------------------------MAKE ACCOUNT------------------------------------------------------
//SHOW - MAKE AN ACCOUNT page
router.get('/signUpPart1', function (req, res) {
    res.render('signUpPart1', { title: 'Sign Up' });
});

//-----------------------------GUEST MEMBER-------------------------------------------------
//how do organizations sign up? how we make sure not everyone signs up as an organization?
//SHOW
router.get('/signUp/guestMember', function (req, res) {
    res.render('signUpGuestMember', { title: 'Guest - Sign Up' })
});
//NEW
router.post('/signUp/guestMember/new', function (req, res) {
    //collect data from form using req.body.variableName
    //use that data to make an account using admin.auth().createUser({ stuff; }); that is provided by firebase
    var emailInput = req.body.email,
        passwordInput = req.body.password,
        organizationNameInput = req.body.organizationName,
        userAccountId;
    admin.auth().createUser({ //this will generate a random uid 
        email: emailInput,
        emailVerified: false,
        displayName: organizationName,
        password: passwordInput,
        disabled: false
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            res.send(userRecord.uid);
            userAccountId = userRecord.uid;
        }) // userAccountId = uid created by firebase here
        .catch(function (error) {
            console.log("Error creating new user:", error);
            res.send(error);
        });
    //FULL GUEST DATA 
    db.ref().child('/guestProfiles/' + userAccountId).set({
        email: emailInput,
        organizationName: organizationNameInput,
        //events created by user
        eventsList: {event_0: null} //this will not exist until the user creates
    });
    //how to add events to the organization?
    //how to add preexisting events to an organization who is late signing up?, do we just let any organization sign up?
    //assuming not anyone can sign up as an organization... we create a list of allowed organizations
});
//---------------------------CONTINUING MEMBER----------------------------------------------
//SHOW - SIGN UP FOR CONTINUING MEMBER
router.get('/signUp/continuingMember', function (req, res) {
    res.render('signUpContinuingMember', { title: 'Sign Up' });
});
//NEW - SIGN UP FOR CONTINUING MEMBER - incomplete
router.post('/signUp/continuingMember', function (req, res) {
    var membershipType = 'continuingMember';
});
//-------------------------------NEW MEMBER--------------------------------------------------
//SHOW
router.get('/signUp/newMember', function (req, res) {
    res.render('signUpNewMember', { title: 'sign up'});
});
//NEW
router.post('/signUp/newMember/new', function (req, res) {
    var membershipType = 'generalMember',
        schoolEmail = req.body.schoolEmail,
        secondaryEmail = req.body.secondaryEmail,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        certificateName = req.body.certificateName,
        password = req.body.password,//--
        studentId = req.body.studentId,
        associatedStudentsStickerNumber = req.body.associatedStudentsStickerNumber,
        phoneNumber = req.body.phoneNumber,
        currentAddress = req.body.currentAddress,
        city = req.body.city,
        zipCode = req.body.zipCode,
        totalAddress = currentAddress + ' ' + city + ' ' + zipCode,
        signUpDate = req.body.signUpDate,
        userAccountIdGenerated;
    admin.auth().createUser({ //this will generate a random uid 
            email: schoolEmail,
            emailVerified: false,
            password: password,
            disabled: false
        })
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
                userAccountIdGenerated = userRecord.uid;
                db.ref().child('userProfileList/' + userAccountIdGenerated).set({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName,
                    certificateName: certificateName,
                    membershipType: membershipType,
                    password: password,
                    studentId: studentId,
                    associatedStudentsStickerNumber: associatedStudentsStickerNumber,
                    phoneNumber: phoneNumber,
                    totalAddress: totalAddress,
                    signUpDate: signUpDate,
                    userAccountIdGenerated: userAccountIdGenerated,
                    //default values
                    isDriver: false,
                    peopleInCarCapacity: 0,
                    totalHours: 0,
                    independentTotalHours: 0,
                    sponsoredTotalHours: 0,
                    semesterHours: 0,
                    sponsoredHours: 0,
                    independentHours: 0,
                    negativeHours: 0,
                    // board members
                    CommitteeCreditApproved: false,
                    userPaid: false,
                    //admin
                    isGpaApproved: false,
                    isUnitsApproved: false
                });
                db.ref().child('userSearchList').push({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName,
                    membershipType: membershipType,
                    studentId: studentId,
                    userAccountIdGenerated: userAccountIdGenerated
                });
                db.ref().child('massEmailList').push({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName
                });
                res.send(userRecord.uid);
            }) // userAccountId = uid created by firebase here
            .catch(function (error) {
                console.log("Error creating new user:", error);
                res.send(error);
            });

    //res.send('test complete');
});
//-------------------TEST-----------------------------------------------------------
//SHOW
router.get('/test/', function (req, res) {
    res.render('testForm', { title: 'Test Form' });
});
//NEW
router.post('/test/new', function (req, res) {
    var membershipType = 'generalMember',
        schoolEmail = req.body.schoolEmail,
        secondaryEmail = req.body.secondaryEmail,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        certificateName = req.body.certificateName,
        password = req.body.password,//--
        studentId = req.body.studentId,
        associatedStudentsStickerNumber = req.body.associatedStudentsStickerNumber,
        phoneNumber = req.body.phoneNumber,
        currentAddress = req.body.currentAddress,
        city = req.body.city,
        zipCode = req.body.zipCode,
        totalAddress = currentAddress + ' ' + city + ' ' + zipCode,
        signUpDate = req.body.signUpDate,
        userAccountIdGenerated;
    admin.auth().createUser({ //this will generate a random uid 
            email: schoolEmail,
            emailVerified: false,
            password: password,
            disabled: false
        })
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
                userAccountIdGenerated = userRecord.uid;
                db.ref().child('userProfileList/' + userAccountIdGenerated).set({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName,
                    certificateName: certificateName,
                    membershipType: membershipType,
                    password: password,
                    studentId: studentId,
                    associatedStudentsStickerNumber: associatedStudentsStickerNumber,
                    phoneNumber: phoneNumber,
                    totalAddress: totalAddress,
                    signUpDate: signUpDate,
                    userAccountIdGenerated: userAccountIdGenerated,
                    //default values
                    isDriver: false,
                    peopleInCarCapacity: 0,
                    totalHours: 0,
                    independentTotalHours: 0,
                    sponsoredTotalHours: 0,
                    semesterHours: 0,
                    sponsoredHours: 0,
                    independentHours: 0,
                    negativeHours: 0,
                    // board members
                    CommitteeCreditApproved: false,
                    //admin
                    isGpaApproved: false,
                    isUnitsApproved: false
                });
                db.ref().child('userSearchList').push({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName,
                    membershipType: membershipType,
                    studentId: studentId,
                    userAccountIdGenerated: userAccountIdGenerated
                });
                db.ref().child('massEmailList').push({
                    schoolEmail: schoolEmail,
                    secondaryEmail: secondaryEmail,
                    firstName: firstName,
                    lastName: lastName
                });
                res.send(userRecord.uid);
            }) // userAccountId = uid created by firebase here
            .catch(function (error) {
                console.log("Error creating new user:", error);
                res.send(error);
            });

    //res.send('test complete');
});

//--------------------------------EVENTS--------------------------------------------------

// //SHOW - ALL EVENTS
// /events

// /SHOW - CREATE EVENT FORM - complete
// /createEvent
// //NEW - complete
// /createEvent/new - complete
// //EDIT
// /events/:id/edit
// //SHOW - EVENT PROFILE
// /events/:id/profile
//     //will have user sign up form in it

//SHOW - CREATE EVENT FORM
router.get('/createEvent', function(req, res){
    res.render('createEvent', {title: 'create event'});  
});
//NEW - CREATE EVENT
router.post('/createEvent/new', function(req, res){
    var eventName = req.body.eventName,
        description = req.body.description,
        dateOfEvent = req.body.dateOfEvent,
        maxNumberOfSignUps = req.body.maxNumberOfSignUps,
        timeStart = req.body.timeStart,
        timeEnd = req.body.timeEnd;
    var eventProfilesRef = db.ref().child('eventProfiles');
    var eventPushGeneratedId = eventProfilesRef.push().key;
    db.ref().child('eventProfiles/' + eventPushGeneratedId).set({
        eventName: eventName,
        description: description,
        dateOfEvent: dateOfEvent,
        timeStart: timeStart,
        timeEnd: timeEnd,
        eventPushGeneratedId: eventPushGeneratedId,
        maxNumberOfSignUps: maxNumberOfSignUps,
        numberOfHeadersSignedUp: 'function similar to numberOfDrivers'
    });
    db.ref().child('eventSearchList/' + eventPushGeneratedId).set({
        eventName: eventName,
        header: 'header\'s user id',
        numberOfDrivers: 'determined by a function that will counte number of drivers in userSignUpsForEvent',
        dates: 'start and end dates and time',
        numberOfPeopleSignedUp: 'function similar to numberOfDrivers',
        maxNumberOfSignUps: maxNumberOfSignUps,
        currentNumberOfSignUps: 'live number of sign ups for the event'
    });
    //this will be updated by a form where users sign up for the event
    db.ref().child('eventUserSignUps/' + eventPushGeneratedId).set({
        temporaryUser1: true,
        temporaryUser2: false
    });
    res.send('redirect to a success message - by using a callback function?');
});

//------------------------ QUERY ------------------------------
router.get('/search', function (req, res) {
    var ref = db.ref();
    ref.orderByKey().on("value", function (snapshot) {
        console.log(snapshot.key);
    });
    res.send('success');
    console.log('boga');
});



































// IF USERS HAVE TO PAY AT THE FRONT AND CANNOT PAY AGS ONLINE




//-------------------------PRE SIGN UP-------------------------
//SHOW
router.get('/preSignUp', function(req,res){
    res.render('preSignUp', {title: 'pre sign up'});
});
//NEW
router.post('/preSignUp/new', function(req,res){
    var schoolEmail = req.body.schoolEmail,
        secondaryEmail = req.body.secondaryEmail,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        massEmailList = db.ref().child('massEmailList')
    var pushGeneratedKey = massEmailList.push().key;
    db.ref().child('massEmailList/' + pushGeneratedKey).set({
        schoolEmail: schoolEmail,
        secondaryEmail: secondaryEmail,
        firstName: firstName,
        lastName: lastName,
        feePaid: true,
        pushGeneratedKey: pushGeneratedKey
    });
    res.send(pushGeneratedKey);
});

//users go to the front -> pay -> input their data to the form -> fully sign up later
//sign up will now use the pushKey generated as user's id number in our database





module.exports = router;




































{
    // router.post('/signUp/newMember/new', function (req, res) {
    //     var membershipTypeInput = 'newMember',
    //         firstNameInput = req.body.firstName,
    //         lastNameInput = req.body.lastName,
    //         fullNameInput = req.body.fullName,
    //         schoolEmailInput = req.body.schoolEmail,
    //         secondaryEmailInput = req.body.secondaryEmail,
    //         passwordInputInput = req.body.password, //used with .auth().createUser() - will not be present on user's profile page
    //         studentIdInput = req.body.studentId,
    //         associatedStudentsStickerNumberInput = req.body.associatedStudentsStickerNumber,
    //         phoneNumberInput = req.body.phoneNumber,
    //         currentAddressInput = req.body.currentAddress,
    //         cityInput = req.body.city,
    //         zipCodeInput = req.body.zipCode,
    //         totalAddressInput = currentAddress + ', ' + city + ', ' + zipCode,
    //         signUpDateInput = req.body.signUpDate,
    //         userAccountIdGenerated; 
    //     var userSearchList = db.ref().child('userSearchList');
    //     //userAccountId will be assigned a value by admin.auth().createUser()
    //     //block of comments created to be collapsed while programming
    //     {
    //         /*
    //     for user's address, only totalAddress will be stored

    //     will have two versions of a 'user profile':
    //         one created using authentication service provided by firebase which provides
    //         us with a userRecord object holding the following: email, emailVerified,disabled,  password, displayName, UID;

    //         the other created using our database where it will include everything
    //     added RDB - realtime database, as a way to differentiate between password from and password inside createUser object
    //     */
    //     }

    //     //firebase stores metadata of when the account is created so we do not need to store the creation date from the form for new user
    //     admin.auth().createUser({ //this will generate a random uid 
    //         email: schoolEmail,
    //         emailVerified: false,
    //         password: passwordInput,
    //         disabled: false
    //     })
    //         .then(function (userRecord) {
    //             // See the UserRecord reference doc for the contents of userRecord.
    //             console.log("Successfully created new user:", userRecord.uid);
    //             res.send(userRecord.uid);
    //             userAccountId = userRecord.uid;
    //         }) // userAccountId = uid created by firebase here
    //         .catch(function (error) {
    //             console.log("Error creating new user:", error);
    //             res.send(error);
    //         });
    //     //list for all of user's data - will not include password, changing password and email will be on a seperate page
    //     db.ref().child('/userProfiles/' + userAccountIdGenerated).set({
    //         membershipType: 'New',
    //         firstName: firstNameInput,
    //         lastName: lastNameInput,
    //         fullName: fullNameInput, //change to certificateName and same for the form
    //         schoolEmail: schoolEmailInput,
    //         secondaryEmail: secondaryEmailInput,
    //         studentId: studentIdInput,
    //         associatedStudentsStickerNumber: associatedStudentsStickerNumberInput,
    //         phoneNumber: phoneNumberInput,
    //         totalAddress: totalAddressInput,
    //         eSignature: eSignatureInput,
    //         signUpDate: signUpDateInput,
    //         //DEFAULT key value pairs for new members
    //         isDriver: false,
    //         peopleInCarCapacity: 0,
    //         isCertificateReady: false,
    //         //HOURS
    //         totalHours: 0,
    //         semesterHours: 0,
    //         independentHours: 0,
    //         independentTotalHours: 0,
    //         sponsoredHours: 0,
    //         sponsoredTotalHours: 0,
    //         //values that reset every semester
    //         isTranscriptReady: false,
    //         negativeHours: 0,
    //         committeeCreditApproved: false,
    //         //admin access only - does not reset every semester
    //         isGpaApproved: false,
    //         isUnitsApproved: false
    //     }); //break up the profile into multiple pieces?
    //     //list is for searching for a user from an admin's perspective
    //     db.ref().child('nameEmailUid').push({
    //         firstName: firstName,
    //         lastName: lastName,
    //         schoolEmail: schoolEmail,
    //         secondaryEmail: secondaryEmail,
    //         studentId: studentId,
    //         userAccountId: userAccountId
    //     });
    //     //list is for sending mass emails using user's full name
    //     db.ref().child('massEmailList').push({
    //         fullName: fullName,
    //         schoolEmail: schoolEmail,
    //         secondaryEmail: secondaryEmail
    //     });

    //     res.redirect('')
    // });
}
