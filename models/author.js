var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  _id: String,
  name: String,
  goodreads: {
    url: String,
    userId: String
  },
  images: {
    small: String,
    medium: String,
    large: String
  },
  about: String,
  fans: Number,
  hometown: String
});
var Author = mongoose.model('Author', authorSchema);
module.exports = Author;