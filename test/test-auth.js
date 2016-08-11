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
  // it('should list ALL blobs on /blobs GET');
  // it('should list a SINGLE blob on /blob/<id> GET');
  // it('should add a SINGLE blob on /blobs POST');
  // it('should update a SINGLE blob on /blob/<id> PUT');
  // it('should delete a SINGLE blob on /blob/<id> DELETE');
// });

describe('Auth', function () {
  before(function(done){
    User.collection.remove();
    done();
  });

  it('should register a SINGLE user on /register POST', function(done) {
    var user = {
      username: 'jjohnson',
      firstName: 'Jason',
      password: 'password',
      confirmPassword: 'password'
    };

    chai.request(server)
    .post('/register')
    .send(user)
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('token');
      done();
    });
  });

  it('should login a SINGLE user on /login POST', function(done) {
    var credentials = {
      username: 'jjohnson',
      password: 'password'
    };

    chai.request(server)
    .post('/login')
    .send(credentials)
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('token');
      done();
    });
  });

  after(function(done){
    User.collection.remove();
    done();
  });
});
