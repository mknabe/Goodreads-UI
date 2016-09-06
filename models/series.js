var mongoose = require('mongoose');
var Book = require('./book');

var seriesSchema = mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  goodreads: {
    url: String
  },
  books: [{
    type: String,
    ref: 'Book'
  }]
});
var Series = mongoose.model('Series', seriesSchema);
module.exports = Series;