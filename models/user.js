var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  // password
  goodreads: {
    id: String,
    // TODO: encode these
    oauthToken: String,
    oauthTokenSecret: String
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;