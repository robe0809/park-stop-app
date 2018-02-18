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
        console.log('saved new ReviewDoc', imageDoc);
        Person.Person.findByIdAndUpdate(
          {"_id": user,},
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
              };
          }
        );
      };
    });
  } 
  else {
    res.sendStatus(403);
  };
});

// *************** Deleting Photos ***************
router.delete('/parks/gallery/:id', (req, res) => {
  let imageId = req.params.id;
  console.log('ha', imageId);
  
  Person.Image.findByIdAndRemove(
    {"_id": imageId},
    (error, removedImage) => {
      if(error) {
        console.log('error on delete image', error);
        res.sendStatus(500);
      } else {
        console.log('Image removed', removedImage);
        res.sendStatus(200);
      }
    });
});

// *************** Getting Reviews ***************
router.get('/parks/reviews/:id', (req, res) => {
  
  let parkId = req.params.id
  console.log('review params', parkId);
  
  Person.Review.find({parkId}, (error, reviewList) => {
    // console.log(image)
    if(error) {
      console.log('error on find allImages', error);
      res.sendStatus(500);
    }
    else {
      console.log('found images documents', reviewList);
      res.send(reviewList);
    }
  });
});

// *************** Posting Reviews ***************
router.post('/parks/reviews', (req, res) => {
  let user = req.user._id
  console.log('Review body', req.body);

  if(req.isAuthenticated()) {
    let newReview = new Person.Review(req.body);
    newReview.save((error, ReviewDoc) => {
      if(error) {
        res.sendStatus(500);
      } 
      else {
        console.log('saved new ReviewDoc', ReviewDoc);
        Person.Person.findByIdAndUpdate(
          {"_id": user,},
          // push this new object into the array on this image Document
          { $push: { userReview: newReview } },
          (pusherror, Reviewdoc) => {
              if (pusherror) {
                  console.log('error on push to ReviewArray: ', pusherror);
                  res.sendStatus(500);
              } else {
                  console.log('updated person Document: ', Reviewdoc);
                  console.log('-----------------------------');
                  res.sendStatus(201);
              };
          }
        );
      };
    });
  } 
  else {
    res.sendStatus(403);
  };
})

// *************** Deleting Reviews ***************
router.delete('/parks/reviews/:id', (req, res) => {
  let reviewId = req.params.id;
  console.log('review', reviewId);
  
  Person.Review.findByIdAndRemove(
    {"_id": reviewId},
    (error, removedReview) => {
      if(error) {
        console.log('error on delete review', error);
        res.sendStatus(500);
      } else {
        console.log('Review removed', removedReview);
        res.sendStatus(200);
      }
    });
});

// *************** Getting Favorites ***************
router.get('/favorites/:id', (req, res) => {
  
  let user_id = req.params.id
  console.log('yo', user_id);
  
  Person.Favorite.find({user_id}, (error, favorite) => {
    if(error) {
      console.log('error on find favorites', error);
      res.sendStatus(500);
    }
    else {
      console.log('found favorites documents', favorite);
      res.send(favorite);
    }
  });
});

// *************** Posting Favorites ***************
router.post('/favorites', (req, res) => {
  let user = req.user._id
  console.log('favorites body', req.body);

  if(req.isAuthenticated()) {
    let newFavorite = new Person.Favorite(req.body);
    newFavorite.save((error, FavoriteDoc) => {
      if(error) {
        res.sendStatus(500);
      } 
      else {
        console.log('saved new ReviewDoc', FavoriteDoc);
        Person.Person.findByIdAndUpdate(
          {"_id": user,},
          // push this new object into the array on this favorite Document
          { $push: { userFavorite: newFavorite } },
          (pusherror, FavoriteDoc) => {
              if (pusherror) {
                  console.log('error on push to FavoriteArray: ', pusherror);
                  res.sendStatus(500);
              } else {
                  console.log('updated person Document: ', FavoriteDoc);
                  console.log('-----------------------------');
                  res.sendStatus(201);
              };
          }
        );
      };
    });
  } 
  else {
    res.sendStatus(403);
  };
})
// *************** Delete Favorites ***************
router.delete('/favorites/:id', (req, res) => {
  let favoriteId = req.params.id;
  console.log('favorite', favoriteId);
  
  Person.Favorite.findByIdAndRemove(
    {"_id": favoriteId},
    (error, removedFavorite) => {
      if(error) {
        console.log('error on delete favorite', error);
        res.sendStatus(500);
      } else {
        console.log('favorite removed', removedFavorite);
        res.sendStatus(200);
      }
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
