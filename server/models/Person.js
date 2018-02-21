const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ImageSchema = new Schema({
    user_id: { type: String, required: true },
    parkId: { type: String, required: true },
    description: { type: String },
    imgFile: { type: String, required: true }
})

const ReviewSchema = new Schema({
    username: { type: String, required: true },
    user_id: { type: String, required: true },
    parkId: { type: String, required: true },
    comment: { type: String, required: true },
    ratings: { type: Number, required: true }
})
const FavoriteSchema = new Schema({
    parkName: { type: String, required: true },
    user_id: { type: String, require: true },
    parkId: { type: String, required: true }
})
FavoriteSchema.index({ user_id: 1, parkId: 1 }, { unique: true });

const PersonSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    userImage: [{ type: mongoose.Schema.ObjectId, ref: 'Image' }],
    userReview: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
    userFavorite: [{ type: mongoose.Schema.ObjectId, ref: 'Favorite' }],
});

let Person = mongoose.model('Person', PersonSchema)
let Image = mongoose.model('Image', ImageSchema)
let Review = mongoose.model('Review', ReviewSchema)
let Favorite = mongoose.model('Favorite', FavoriteSchema)

module.exports = { Person, Image, Review, Favorite };

