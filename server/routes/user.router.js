const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();
const env = require('dotenv');
const axios = require('axios');

// *************** get request to api for park information ***************
router.get('/parkInfo/:parkCode/', (req, res) => {
  const url = `https://developer.nps.gov/api/v1/parks/`
  const config = {
    params: {
      parkCode: req.params.parkCode,
      api_key: process.env.API_KEY,
    }
  }
  axios.get(url, config)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
})

// *************** get request to api for articles and events ***************
router.get('/parkInfo/:currentNavItem/:parkSelected/', (req, res) => {
  let navItem = req.params.currentNavItem;
  const url = `https://developer.nps.gov/api/v1/${navItem}/`;

  const config = {
    params: {
      parkCode: req.params.parkSelected,
      api_key: process.env.API_KEY,
    }
  }
  axios.get(url, config)
    .then(function (response) {
      console.log(response);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
})

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
