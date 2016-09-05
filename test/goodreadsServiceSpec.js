var chai = require('chai');
var should = chai.should();

var goodreadsService = require('../services/goodreads/goodreadsService');

describe('Goodreads service', function() {
  it('should get friends\' updates', function(done) {
    var user = {
      user_oauth_token: 'lvyfhbqFMhih7ZGdUyCw',
      user_oauth_token_secret: 'IaJzlM2PejXUtiSNRXxkOE8SFTDwpR69zbo74kt4ZoY'
    };
    goodreadsService.getUpdatesFeed(user).then(function (response) {
      should.exist(response.GoodreadsResponse);
      done();
    });
  });

  it('should get a user\'s reviews', function(done) {
    var user = {
      user_oauth_token: 'lvyfhbqFMhih7ZGdUyCw',
      user_oauth_token_secret: 'IaJzlM2PejXUtiSNRXxkOE8SFTDwpR69zbo74kt4ZoY',
      goodreads_user_id: '5964172'
    };
    goodreadsService.findReviewsForUser(user, {}).then(function (reviews) {
      true.should.equal(reviews.constructor === Array);
      done();
    });
  });

  it('should get a book', function(done) {
    var bookId = 21853621;
    goodreadsService.findBook(bookId).then(function (json) {
      should.exist(json.id);
      done();
    });
  });
});