'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var jwt = require('express-jwt');
//middleware for authenticating jwt tokens
var auth = jwt({
  secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
  userProperty: 'payload'
});

var expect = chai.expect;
chai.use(chaiHttp);

// describe('Blobs', function() {
//   it('should list ALL blobs on /blobs GET');
//   it('should list a SINGLE blob on /blob/<id> GET');
//   it('should add a SINGLE blob on /blobs POST');
//   it('should update a SINGLE blob on /blob/<id> PUT');
//   it('should delete a SINGLE blob on /blob/<id> DELETE');
// });

describe('Users', function () {
  User.collection.remove();

  beforeEach(function(done){
    var user = new User();
    user.username = 'jjohnson';
    user.firstName = 'Jason';
    user.setPassword('password');

    user.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    User.collection.remove();
    done();
  });

  it('should list a SINGLE user on /user/:username GET', function(done) {
    chai.request(server)
    .get('/user/jjohnson')
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('username');
      expect(res.body).to.have.property('firstName');
      expect(res.body.username).to.equal('jjohnson');
      expect(res.body.firstName).to.equal('Jason');
      done();
    });
  });
});
