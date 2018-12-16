var request = require("request"),
    assert = require('assert'),
    helloWorld = require("../server.js"),
    base_url = "http://localhost:3000/api/";


describe("Cache Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("Hello World", body);
        done();
      });
    });
  });
});

  describe('POST /create Cache', function() {
      it('returns status code 200 and creates test1 record', function(done) {
        var options = {
          uri: base_url+"createCache",
          method: 'POST',
          json: {
            keyName: 'test1'
          }
        };
        request(options, function (error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
  });

  describe("Get All keys API", function() {
    describe("GET all keys", function() {
      it("returns status code 200", function(done) {
        request.get(base_url+"getKeys", function(error, response, body) {
          //expect(response.statusCode).toBe(200);
          assert.equal(200, response.statusCode);
          done();
        });
      });
    });
  });
  describe('POST /Update Cache By ID', function() {
      it('returns status code 200 and updates test1 record', function(done) {
        var options = {
          uri: base_url+"updateCache",
          method: 'POST',
          json: {
            keyName: 'test1'
          }
        };
        request(options, function (error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
  });
  describe('POST /delete Cache By ID', function() {
      it('returns status code 200 and deletes test1 record', function(done) {
        var options = {
          uri: base_url+"deleteCache",
          method: 'POST',
          json: {
            keyName: 'test1'
          }
        };
        request(options, function (error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
  });

describe("Delete All keys", function() {
  describe("Delete /", function() {
    it("returns status code 200 and deletes all keys", function(done) {
      request.get(base_url+"deleteCache", function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
});
