'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var expect = chai.expect;
chai.use(chaiHttp);

// describe('Blobs', function() {
  // it('should list ALL blobs on /blobs GET');
  // it('should list a SINGLE blob on /blob/<id> GET');
  // it('should add a SINGLE blob on /blobs POST');
  // it('should update a SINGLE blob on /blob/<id> PUT');
  // it('should delete a SINGLE blob on /blob/<id> DELETE');
// });

var header;
var content;

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
      expect(res).to.have.status(201);
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

      header = "Authorization";
      content = "Bearer " + res.body.token;
      done();
    });
  });
});

describe('User', function () {
  after(function(done){
    User.collection.remove();
    done();
  });

  it('should list a SINGLE user on /user/:username GET', function(done) {
    chai.request(server)
    .get('/user/jjohnson')
    .set(header,content)
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
