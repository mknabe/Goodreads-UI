var mongoose = require('mongoose');
var Author = require('./author');
var Series = require('./series');

var bookSchema = mongoose.Schema({
  _id: String,
  title: String,
  authors: [{
    type: String,
    ref: 'Author'
  }],
  description: String,
  series: {
    goodreadsId: {
      type: String,
      ref: 'Series'
    },
    title: String,
    position: Number
  },
  images: {
    small: String,
    medium: String,
    large: String
  },
  goodreads: {
    workId: String,
    url: String
  },
  rating: {
    count: Number,
    average: Number,
    sum: Number,
    dist: String // 5:4140|4:2855|3:856|2:200|1:121|total:8172
  },
  review: {
    total: Number,
    text: Number
  },
  publication: Date,
  firstPublication: Date,
  isbn: String,
  isbn13: String,
  numPages: Number,
  popularShelves: [{
    name: String,
    count: Number
  }]
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;