var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  name: String,
  // password
  goodreads: {
    // TODO: encode these
    oauthToken: String,
    oauthTokenSecret: String
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;