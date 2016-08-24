var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  goodreads: {
    id: String
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;