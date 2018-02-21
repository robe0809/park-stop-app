const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// *************** Getting All Photos ***************
router.get('/parks/gallery/:id', (req, res) => {

  let parkId = req.params.id
  console.log('parkId', req.params.id);
  if (req.isAuthenticated()) {
    Person.Image.find({ parkId }, (error, image) => {
      // console.log(image)
      if (error) {
        console.log('error on find allImages', error);
        res.sendStatus(500);
      }
      else {
        console.log('found images documents', image);
        res.send(image);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

// *************** Posting Photos ***************
router.post('/parks/gallery/', (req, res) => {
  console.log('body', req.body);
  let user = req.user._id;
  if (req.isAuthenticated()) {
    let newImage = new Person.Image(req.body);
    newImage.save((error, imageDoc) => {
      if (error) {
        res.sendStatus(500);
      }
      else {
        console.log('saved new imageDoc', imageDoc);
        Person.Person.findByIdAndUpdate(
          { "_id": user, },
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
  if (req.isAuthenticated()) {
    Person.Image.findByIdAndRemove(
      { "_id": imageId },
      (error, removedImage) => {
        if (error) {
          console.log('error on delete image', error);
          res.sendStatus(500);
        } else {
          console.log('Image removed', removedImage);
          res.sendStatus(200);
        }
      });
  } else {
    res.sendStatus(403);
  }
});

// *************** Posting Photos Descriptions ***************
router.post('/parks/gallery/:id', (req, res) => {
  let imageId = req.params.id;
  console.log('imageId', imageId);
  if (req.isAuthenticated()) {
    let newDescription = req.body.description;
    Person.Image.update({ "_id": imageId }, { $set: { description: newDescription } }, (error, descriptionDoc) => {
      if (error) {
        console.log('hitting', error);
        res.sendStatus(500);
      }
      else {
        console.log('received description', descriptionDoc);
        res.sendStatus(201);
      };
    });
  }
  else {
    res.sendStatus(403);
  };
});
module.exports = router;