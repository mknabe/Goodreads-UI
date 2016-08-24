var mongoose = require('mongoose');
var author = require('./author');

var bookSchema = mongoose.Schema({
  title: String,
  sortByTitle: String,
  authors: [author],
  series: {
    title: String,
    position: Number
  },
  images: {
    small: String,
    medium: String,
    large: String
  },
  goodreads: {
    id: String,
    workId: String,
    url: String
  },
  rating: {
    count: Number,
    average: Number,
    sum: Number,
    dist: String //<rating_dist>5:4140|4:2855|3:856|2:200|1:121|total:8172</rating_dist>
  },
  review: {
    total: Number,
    text: Number
  },
  publication: {
    day: Number,
    month: Number,
    year: Number
  }
  isbn: String,
  isbn13: String,
  numPages: Number
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;