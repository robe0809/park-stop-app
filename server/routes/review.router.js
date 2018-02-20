const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// *************** Getting Reviews ***************
router.get('/parks/reviews/:id', (req, res) => {

  let parkId = req.params.id
  console.log('review params', parkId);
  if (req.isAuthenticated()) {
    Person.Review.find({ parkId }, (error, reviewList) => {
      // console.log(image)
      if (error) {
        console.log('error on find allImages', error);
        res.sendStatus(500);
      }
      else {
        console.log('found images documents', reviewList);
        res.send(reviewList);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

// *************** Posting Reviews ***************
router.post('/parks/reviews', (req, res) => {
  let user = req.user._id
  console.log('Review body', req.body);

  if (req.isAuthenticated()) {
    let newReview = new Person.Review(req.body);
    newReview.save((error, ReviewDoc) => {
      if (error) {
        res.sendStatus(500);
      }
      else {
        console.log('saved new ReviewDoc', ReviewDoc);
        Person.Person.findByIdAndUpdate(
          { "_id": user, },
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
  if (req.isAuthenticated()) {
    Person.Review.findByIdAndRemove(
      { "_id": reviewId },
      (error, removedReview) => {
        if (error) {
          console.log('error on delete review', error);
          res.sendStatus(500);
        } else {
          console.log('Review removed', removedReview);
          res.sendStatus(200);
        }
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;