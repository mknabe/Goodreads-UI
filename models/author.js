var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  name: String,
  goodreads: {
    id: String,
    url: String
  }
  // books?
});
var Author = mongoose.model('Series', authorSchema);
module.exports = Author;