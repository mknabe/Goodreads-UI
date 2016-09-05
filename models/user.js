var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  // password
  goodreads: {
    id: {
      type: String,
      unique: true
    },
    // TODO: encode these
    oauthToken: String,
    oauthTokenSecret: String
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;