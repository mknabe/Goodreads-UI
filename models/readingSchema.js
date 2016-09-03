var mongoose = require('mongoose');

var readingSchema = mongoose.Schema({
  dateStarted: Date,
  dateFinished: Date,
  format: {
    type: String,
    enum : ['LISTENED', 'READ', 'BOTH']
  }
});
module.exports = readingSchema;