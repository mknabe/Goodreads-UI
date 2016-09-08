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
  _id: String,
  book: {
    extended: {
      type: String,
      ref: 'Book',
      required: true
    },
    title: String,
    authors: [{
      goodreadsId: String,
      name: String
    }],
    series: {
      title: String,
      position: Number,
      goodreadsId: String
    },
    numPages: Number,
    averageRating: Number,
    images: {
      small: String,
      medium: String,
      large: String
    }
  },
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  goodreads: {
    url: String
  },
  rating: Number,
  body: String,
  shelves: [String],
  readings: [readingSchema],
  owned: Boolean,
  dateAdded: Date
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;