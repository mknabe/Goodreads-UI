var mongoose = require('mongoose');
var book = require('./book');
var user = require('./user');
var reading = require('./reading');

var reviewSchema = mongoose.Schema({
  book: book,
  user: user,
  goodreads: {
    id: String,
    url: String
  },
  rating: Number,
  body: String,
  shelves: [String],
  readings: [reading],
  owned: Boolean,
  dateAdded: Date
});
var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;