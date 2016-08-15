'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var expect = chai.expect;
chai.use(chaiHttp);

describe('Accomplishments', function () {
  it('should access TREEHOUSE DATA on /api/treehouse GET', function (done) {
    chai.request(server)
    .get('/api/treehouse')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should access CODESCHOOL DATA on /api/codeschool GET', function (done) {
    chai.request(server)
    .get('/api/codeschool')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});
