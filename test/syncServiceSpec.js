process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var bookData = require('./data/bookData').books;
var userData = require('./data/userData').users;

var Promise = require('bluebird');
var mongoose = require('mongoose');

var User = require('../models/User');
var Book = require('../models/book');
var syncService = require('../services/syncService');
var bookDao = require('../services/bookDao');

before(function () {
  mongoose.Promise = Promise;
});

describe('Syncing books', function () {
  beforeEach(function (done) {
    Promise.all([
      Book.collection.insertMany(bookData),
      User.collection.insertMany(userData)
    ]).then(function() {
      done();
    });
  });

  afterEach(function (done) {
    Promise.all([
        Book.remove({}),
        User.remove({})
    ]).then(function() {
      done();
    });
  });

  it('should get the book if it already exists', function(done) {
    var existingBook = bookData[0];
    var id = mongoose.Types.ObjectId(bookData[0]._id);
    syncService.syncBook(existingBook).then(function (book) {
      should.exist(book);
      id.should.equal(existingBook._id);
      done();
    });
  });

  it('should create the book if it does not exist', function(done) {
    var newBook = {
      title: "my book",
      goodreads: { id: 432 }
    };
    syncService.syncBook(newBook).then(function (savedBook) {
      bookDao.findBookById(savedBook._id).then(function (foundBook) {
        should.exist(foundBook);
        true.should.equal(foundBook instanceof Book);
        newBook.title.should.equal(foundBook.title);
        done();
      });
    });
  });
});

describe('Syncing reviews', function() {
  it('should save a new review with a reference to an existing book', function(done) {
    var newReview = {
      goodreads: {
        id: 'R1'
      },
      book: {
        goodreads: {
          id: 'B1'
        }
      }
    };
    var username = userData[0].username;
    syncService.syncReview(newReview, username).then(function (review) {
      should.exist(review);
      review.username.should.equal(username);
      review.bookId.should.exist();
      done();
    });
  });
});