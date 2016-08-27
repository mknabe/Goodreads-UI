var mongoose = require('mongoose');
var Book = require('./book');
var User = require('./user');
var Reading = require('./reading');

var reviewSchema = mongoose.Schema({
  book: Book,
  user: User,
  goodreads: {
    id: String,
    url: String
  },
  rating: Number,
  body: String,
  shelves: [String],
  readings: [Reading],
  owned: Boolean,
  dateAdded: Date
});
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;