var mongoose = require('mongoose');

// TODO: user status updates

var readingSchema = mongoose.Schema({
  dateStarted: Date,
  dateFinished: Date,
  format: {
    type: String,
    enum : ['LISTENED', 'READ', 'BOTH', 'UNKNOWN']
  }
});

var reviewSchema = mongoose.Schema({
  book: {
    goodreadsId: {
      type: String,
      ref: 'Book.goodreads.id',
      required: true
    }
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
  readings: [readingSchema],
  owned: Boolean,
  dateAdded: Date
});
var Review = mongoose.model('Series', reviewSchema);
module.exports = Review;