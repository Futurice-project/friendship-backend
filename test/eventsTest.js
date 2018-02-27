var expect = require('chai').expect;
var request = require('request');

describe('Test Event API', function() {
  describe('Event List Test', function() {
    var url = 'http://0.0.0.0:3888/events';

    it('returns status 200', function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Get one event', function() {
    var url = 'http://0.0.0.0:3888/event/1';

    it('returns status 200', function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
