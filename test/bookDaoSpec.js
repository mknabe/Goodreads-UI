process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var bookData = require('./data/bookData').books;

var mongoose = require('mongoose');

var config = require('../config');
var Book = require('../models/book');
var bookDao = require('../services/bookDao');

before(function (done) {
  var opts = {
    server: {
      socketOptions: { keepAlive: 1 }
    },
    promiseLibrary: require('bluebird')
  };
  mongoose.connect(config.mongo[process.env.NODE_ENV], opts, done);
  mongoose.Promise = require('bluebird');
});

describe('Books Dao', function () {
  beforeEach(function (done) {
    Book.collection.insertMany(bookData, function(err,r) {
      r.insertedCount.should.equal(bookData.length);
      bookData = r.ops;
      done();
    });
  });

  afterEach(function (done) {
    Book.remove({}, done);
  });

  it('should be able to lookup books by Goodreads Id', function (done) {
    var goodreadsId = bookData[0].goodreads.id;
    bookDao.findBookByGoodreadsId(goodreadsId).then(function(book) {
      book.title.should.equal(bookData[0].title);
      done();
    });
  });

  it('should be able to lookup books that do not exist by Goodreads Id', function (done) {
    bookDao.findBookByGoodreadsId("NOTHING").then(function(book) {
      should.not.exist(book);
      done();
    });
  });

  it('should be able to lookup books by Id', function (done) {
    var id = mongoose.Types.ObjectId(bookData[0]._id);
    bookDao.findBookById(id).then(function(book) {
      book.title.should.equal(bookData[0].title);
      done();
    });
  });

  it('should be able to save a new book', function(done) {
    var newBook = {
      title: "my book",
      goodreads: { id: 432 }
    };
    bookDao.saveBook(newBook).then(function (book) {
      should.exist(book);
      newBook.title.should.equal(book.title);
      done();
    });
  });

  it('should be able to check if a book exists', function(done) {
    var goodreadsId = bookData[0].goodreads.id;
    bookDao.doesBookExistForGoodreadsId(goodreadsId).then(function(doesBookExist) {
      doesBookExist.should.equal(true);
      done();
    })
  });

  it('should be able to check if a book does not exist', function(done) {
    var goodreadsId = "CBAF";
    bookDao.doesBookExistForGoodreadsId(goodreadsId).then(function(doesBookExist) {
      doesBookExist.should.equal(false);
      done();
    })
  });
});