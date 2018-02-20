const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// *************** Getting Favorites ***************
router.get('/favorites/:id', (req, res) => {

    let user_id = req.params.id
    console.log('yo', user_id);
    if (req.isAuthenticated()) {
        Person.Favorite.find({ user_id }, (error, favorite) => {
            if (error) {
                console.log('error on find favorites', error);
                res.sendStatus(500);
            }
            else {
                console.log('found favorites documents', favorite);
                res.send(favorite);
            }
        });
    } else {
        res.sendStatus(403);
    }
});

// *************** Posting Favorites ***************
router.post('/favorites', (req, res) => {
    let user = req.user._id
    console.log('favorites body', req.body);

    if (req.isAuthenticated()) {
        let newFavorite = new Person.Favorite(req.body);
        console.log('newFavorite', newFavorite.parkId);

        newFavorite.save((error, FavoriteDoc) => {
            if (error) {
                res.send({error: 500, response: "You have already favorited this park!"});
            } else {
                console.log('saved new favoirteDoc', FavoriteDoc);
                Person.Person.findByIdAndUpdate(
                    { "_id": user, },
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
            }
        });
    }
    else {
        res.sendStatus(403);
    };
});
// *************** Delete Favorites ***************
router.delete('/favorites/:id', (req, res) => {
    let favoriteId = req.params.id;
    console.log('favorite', favoriteId);
    if (req.isAuthenticated()) {
        Person.Favorite.findByIdAndRemove(
            { "_id": favoriteId },
            (error, removedFavorite) => {
                if (error) {
                    console.log('error on delete favorite', error);
                    res.sendStatus(500);
                } else {
                    console.log('favorite removed', removedFavorite);
                    res.sendStatus(200);
                }
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
