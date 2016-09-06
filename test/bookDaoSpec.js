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
  it('should lookup existing books by Id', function (done) {
    bookDao.findBookById(bookData[0]._id).then(function(book) {
      book.title.should.equal(bookData[0].title);
      done();
    });
  });

  it('should lookup books that do not exist by Id', function (done) {
    bookDao.findBookById("NOTHING").then(function(book) {
      should.not.exist(book);
      done();
    });
  });

  it('should save a new book', function(done) {
    var newBook = {
      '_id': '432',
      title: "my book"
    };
    bookDao.saveBook(newBook).then(function (book) {
      should.exist(book);
      newBook.title.should.equal(book.title);
      done();
    });
  });
});