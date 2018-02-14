const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// *************** Getting All Photos ***************
router.get('/parks/gallery/:id', (req, res) => {
  
  let parkId = req.params.id
  console.log('yo', req.params.id);
  
  Person.Image.find({parkId}, (error, image) => {
    // console.log(image)
    if(error) {
      console.log('error on find allImages', error);
      res.sendStatus(500);
    }
    else {
      console.log('found images documents', image);
      res.send(image);
    }
  });
});

// *************** Posting Photos ***************
router.post('/parks/gallery/', (req, res) => {

  console.log('body', req.body);
  let user = req.user._id;
  if(req.isAuthenticated()) {
    console.log('user', req.user._id);
    let newImage = new Person.Image(req.body);
    newImage.save((error, imageDoc) => {
      if(error) {
        res.sendStatus(500);
      } 
      else {
        console.log('saved new itemDoc', imageDoc);
        
        Person.Person.findByIdAndUpdate(
          {
              "_id": user,
          },
          // push this new object into the array on this image Document
          { $push: { userImage: newImage } },
          (pusherror, doc) => {
              if (pusherror) {
                  console.log('error on push to imageArray: ', pusherror);
                  res.sendStatus(500);
              } else {
                  console.log('updated person Document: ', doc);
                  console.log('-----------------------------');

                  res.sendStatus(201);
              }
          }
        );
      };
    })
  }
});





// *************** Authentication ***************
// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  
  const password = encryptLib.encryptPassword(req.body.password);
  console.log(password);

  const newPerson = new Person.Person({ username, password });
  newPerson.save()
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
