var chai = require('chai');
var should = chai.should();

var mapperService = require('../services/goodreads/mapperService');

var bookXml = require('./data/mapping/goodreads/book.json');
var mappedBook = require('./data/mapping/book-mapped.json');

var reviewXml = require('./data/mapping/goodreads/review.json');
var mappedReview = require('./data/mapping/review-mapped.json');

describe('Mapper service', function() {
  it('should map a book', function() {
    var book = mapperService.mapBook(bookXml);
    book.publication = book.publication.toString();
    book.firstPublication = book.firstPublication.toString();
    delete book.popularShelves;
    book.should.deep.equal(mappedBook);
  });

  it('should map a review', function() {
    var review = mapperService.mapReview(reviewXml);
    review.dateAdded = review.dateAdded.toString();
    review.readings[0].dateStarted = review.readings[0].dateStarted.toString();
    review.should.deep.equal(mappedReview);
  });

});