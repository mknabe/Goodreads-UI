var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
  dateStarted: Date,
  dateFinished: Date,
  format: String, // audio, read
});
var Reading = mongoose.model('Reading', readingSchema);
module.exports = Reading;