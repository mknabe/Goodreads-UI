var mongoose = require('mongoose');
var Reading = require('./readingSchema');

var reviewSchema = mongoose.Schema({
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true
  },
  username: {
    type: String,
    ref: 'User.username',
    required: true
  },
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