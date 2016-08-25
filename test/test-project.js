'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

var expect = chai.expect;
chai.use(chaiHttp);

describe('Projects', function () {
  Project.collection.remove();

  beforeEach(function(done){
    var newProject = new Project({
      name: "Random Quote Generator",
      category: "JavaScript",
      image: "../images/random-quote-generator.png",
      created_on: "2016-07-24T07:00:00.000Z",
      link: "http://amazon.com",
      github_link: "https://github.com/chris-gaona/random-quote",
      comments: "Comments Here",
      treehouse_comments: "Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)",
      grade: "Exceeds Expectations"
    });
    newProject.save(function(err) {
      done();
    });
  });

  afterEach(function(done){
    Project.collection.remove();
    done();
  });

  it('should list ALL projects on /api/projects GET', function (done) {
    chai.request(server)
    .get('/api/projects')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('category');
      expect(res.body[0]).to.have.property('image');
      expect(res.body[0]).to.have.property('created_on');
      expect(res.body[0]).to.have.property('link');
      expect(res.body[0]).to.have.property('github_link');
      expect(res.body[0]).to.have.property('comments');
      expect(res.body[0]).to.have.property('treehouse_comments');
      expect(res.body[0]).to.have.property('grade');
      expect(res.body[0].name).to.equal('Random Quote Generator');
      expect(res.body[0].category).to.equal('JavaScript');
      done();
    });
  });

  it('should list a SINGLE project on /api/project/:id GET', function(done) {
    chai.request(server)
    .get('/api/projects')
    .end(function(err, response){
      chai.request(server)
      .get('/api/project/' + response.body[0]._id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('_id');
        expect(res.body._id).to.equal(response.body[0]._id);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('category');
        expect(res.body).to.have.property('image');
        expect(res.body).to.have.property('created_on');
        expect(res.body).to.have.property('link');
        expect(res.body).to.have.property('github_link');
        expect(res.body).to.have.property('comments');
        expect(res.body).to.have.property('treehouse_comments');
        expect(res.body).to.have.property('grade');
        expect(res.body.name).to.equal('Random Quote Generator');
        expect(res.body.category).to.equal('JavaScript');
        done();
      });
    });
  });

  var header;
  var content;

  before(function (done) {
    var user = {
      username: 'jjohnson',
      firstName: 'Jason',
      password: 'password',
      confirmPassword: 'password'
    };

    chai.request(server)
    .post('/register')
    .send(user)
    .end(function (err, res) {
      header = "Authorization";
      content = "Bearer " + res.body.token;
      done();
    });
  });

  it('should add a SINGLE project on /api/project POST', function(done) {
    var project = {
      name: "Random Quote Generator",
      category: "JavaScript",
      image: "../images/random-quote-generator.png",
      created_on: "2016-07-24T07:00:00.000Z",
      link: "http://amazon.com",
      github_link: "https://github.com/chris-gaona/random-quote",
      comments: "Comments Here",
      treehouse_comments: "Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)",
      grade: "Exceeds Expectations"
    };

    chai.request(server)
    .post('/api/new')
    .set(header,content)
    .send(project)
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('category');
      expect(res.body).to.have.property('image');
      expect(res.body).to.have.property('created_on');
      expect(res.body).to.have.property('link');
      expect(res.body).to.have.property('github_link');
      expect(res.body).to.have.property('comments');
      expect(res.body).to.have.property('treehouse_comments');
      expect(res.body).to.have.property('grade');
      expect(res.body.name).to.equal('Random Quote Generator');
      expect(res.body.category).to.equal('JavaScript');
      done();
    });
  });

  it('should update a SINGLE project on /api/project/:id PUT', function (done) {
    var project = {
      name: "Chris Gaona Portfolio",
      category: "JavaScript",
      image: "../images/random-quote-generator.png",
      created_on: "2016-07-24T07:00:00.000Z",
      link: "http://amazon.com",
      github_link: "https://github.com/chris-gaona/random-quote",
      comments: "Comments Here",
      treehouse_comments: "Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)",
      grade: "Exceeds Expectations"
    };

    chai.request(server)
    .get('/api/projects')
    .end(function (err, response) {
      chai.request(server)
        .put('/api/edit/' + response.body[0]._id)
        .set(header,content)
        .send(project)
        .end(function (error, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('project');
          expect(res.body.project.ok).to.equal(1);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Project Updated');
          done();
      });
    });
  });

  it('should delete a SINGLE project on /api/delete/:id DELETE');

  after(function(done){
    User.collection.remove();
    done();
  });
});
