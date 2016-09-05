var mongoose = require('mongoose');
var Book = require('./book');

var seriesSchema = mongoose.Schema({
  title: String,
  description: String,
  goodreads: {
    id: String,
    url: String
  },
  books: [{
    type: String,
    ref: 'Book.goodreads.id'
  }]
});
var Series = mongoose.model('Series', seriesSchema);
module.exports = Series;