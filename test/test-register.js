'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var expect = chai.expect;
chai.use(chaiHttp);

describe('REGISTER', function () {
  before(function(done){
    User.collection.remove();
    done();
  });

  after(function(done){
    User.collection.remove();
    done();
  });

  it('should handle errors when registering a SINGLE user on /register POST with passwords that do NOT match', function (done) {
    var user = {
      username: 'jjohnson',
      firstName: 'Jason',
      password: 'password',
      confirmPassword: 'password123'
    };

    chai.request(server)
    .post('/register')
    .send(user)
    .end(function(err, res){
      expect(err).to.not.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.property[0].message).to.equal('Uh oh! Passwords do not match');
      done();
    });
  });

  it('should handle errors when registering a SINGLE user on /register POST with the form not complete', function (done) {
    var user = {
      username: '',
      firstName: '',
      password: '',
      confirmPassword: ''
    };

    chai.request(server)
    .post('/register')
    .send(user)
    .end(function(err, res){
      expect(err).to.not.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.property[0].message).to.equal('Please fill out all fields');
      done();
    });
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
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('token');
      done();
    });
  });

  it('should handle errors when registering a SINGLE user on /register POST with a username that already exists', function (done) {
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
      expect(err).to.not.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.property[0].message).to.equal('The username you provided is already in use.');
      done();
    });
  });
});
