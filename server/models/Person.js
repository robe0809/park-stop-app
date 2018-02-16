const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ImageSchema = new Schema({
    user_id: {type: String, required: true},
    parkId: {type: String, required: true},
    description: { type: String},
    imgFile: { type: String, required: true }    
})
const ReviewSchema = new Schema({
    user_id: {type: String, required: true},
    parkId: {type: String, required: true},
    comment: { type: String, required: true },
    ratings: { type: Number, required: true }
})
const FavoriteSchema = new Schema({
    parkId: {type: String, required: true}
})
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  userImage: [{type: mongoose.Schema.ObjectId, ref: 'Image'}],
  userReview: [{type: mongoose.Schema.ObjectId, ref: 'Review'}],
  userFavortie: [FavoriteSchema]
});

let Person = mongoose.model('Person', PersonSchema)
let Image = mongoose.model('Image', ImageSchema)
let Review = mongoose.model('Review', ReviewSchema)

module.exports = {Person, Image, Review};

