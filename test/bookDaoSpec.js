process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var bookData = require('./data/seed/bookData').books;
var testUtil = require('./util/testUtil');

var mongoose = require('mongoose');

var config = require('../config');
var bookDao = require('../services/bookDao');

before(function (done) {
  testUtil.connectToDb(done);
});

beforeEach(function (done) {
  testUtil.seedBooks().then(function () {
    done();
  });
});

describe('Books Dao', function () {
  it('should lookup books by Goodreads Id', function (done) {
    var goodreadsId = bookData[0].goodreads.id;
    bookDao.findBookByGoodreadsId(goodreadsId).then(function(book) {
      book.title.should.equal(bookData[0].title);
      done();
    });
  });

  it('should lookup books that do not exist by Goodreads Id', function (done) {
    bookDao.findBookByGoodreadsId("NOTHING").then(function(book) {
      should.not.exist(book);
      done();
    });
  });

  it('should lookup books by Id', function (done) {
    var id = mongoose.Types.ObjectId(bookData[0]._id);
    bookDao.findBookById(id).then(function(book) {
      book.title.should.equal(bookData[0].title);
      done();
    });
  });

  it('should save a new book', function(done) {
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

  it('should check if a book exists', function(done) {
    var goodreadsId = bookData[0].goodreads.id;
    bookDao.doesBookExistForGoodreadsId(goodreadsId).then(function(doesBookExist) {
      doesBookExist.should.equal(true);
      done();
    })
  });

  it('should check if a book does not exist', function(done) {
    var goodreadsId = "CBAF";
    bookDao.doesBookExistForGoodreadsId(goodreadsId).then(function(doesBookExist) {
      doesBookExist.should.equal(false);
      done();
    })
  });
});