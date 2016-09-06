process.env.NODE_ENV = 'test';

var Promise = require('bluebird');
var mongoose = require('mongoose');

var chai = require('chai');
var should = chai.should();
var bookData = require('./data/seed/bookData').books;
var userData = require('./data/seed/userData').users;
var testUtil = require('./util/testUtil');

var User = require('../models/User');
var Book = require('../models/book');
var syncService = require('../services/syncService');
var bookDao = require('../services/bookDao');

before(function (done) {
  testUtil.connectToDb(done);
});

beforeEach(function (done) {
  Promise.all([
    testUtil.seedAuthors(),
    testUtil.seedBooks(),
    testUtil.seedUsers()
  ]).then(function() {
    done();
  });
});

describe('Syncing books', function () {
  it('should get the book if it already exists', function(done) {
    var existingBook = bookData[0];
    syncService.syncBook(existingBook._id).then(function (book) {
      should.exist(book);
      book.id.should.equal(existingBook._id);
      done();
    });
  });

  it('should create the book if it does not exist', function(done) {
    var goodreadsBookId = '432';
    syncService.syncBook(goodreadsBookId).then(function (savedBook) {
      bookDao.findBookById(savedBook._id).then(function (foundBook) {
        should.exist(foundBook);
        true.should.equal(foundBook instanceof Book);
        goodreadsBookId.should.equal(foundBook.id);
        done();
      });
    });
  });
});

describe('Syncing reviews', function() {
  it('should save a new review with a reference to an existing book', function(done) {
    var goodreadsReviewId = '1456897430';
    var goodreadsUserId = userData[0]._id;
    syncService.syncReview(goodreadsReviewId, goodreadsUserId).then(function (review) {
      should.exist(review);
      review.user.should.equal(goodreadsUserId);
      goodreadsReviewId.should.equal(review.id);
      done();
    });
  });
});