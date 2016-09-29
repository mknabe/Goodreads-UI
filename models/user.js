var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: String,
  goodreads: {
    // TODO: encode these
    oauthToken: String,
    oauthTokenSecret: String
  },
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;