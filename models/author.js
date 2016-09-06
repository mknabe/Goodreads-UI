var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  _id: String,
  name: String,
  goodreads: {
    url: String
  }
  // books?
});
var Author = mongoose.model('Author', authorSchema);
module.exports = Author;