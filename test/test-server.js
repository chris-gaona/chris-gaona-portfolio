'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../src/app');

chai.use(chaiHttp);

describe('Projects', function () {
  it('should list ALL projects on /projects GET', function (done) {
  chai.request('http://localhost:3000/#/')
    .get('/projects')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should list a SINGLE project on /project/:id GET');
  it('should add a SINGLE project on /project POST');
  it('should update a SINGLE project on /project/:id PUT');
  it('should delete a SINGLE project on /project/:id DELETE');
});
