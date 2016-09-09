'use strict';

process.env.NODE_ENV = 'test';

// var fs = require('fs');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/app');

var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var User = mongoose.model('User');

var expect = chai.expect;
chai.use(chaiHttp);

describe('NO PROJECTS', function () {
  it('should handle errors when listing ALL projects on /api/projects GET & there are NO projects', function (done) {
    chai.request(server)
    .get('/api/projects')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.have.property('message');
      expect(res.body.error.message).to.equal('No projects yet');
      done();
    });
  });
});

describe('PROJECTS', function () {
  before(function(done){
    Project.collection.remove();
    done();
  });

  before(function(done){
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

  after(function(done){
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
      expect(res.body[0].category).to.include('JavaScript');
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
        expect(res.body.category).to.include('JavaScript');
        done();
      });
    });
  });

  it('should handle errors when listing a SINGLE project on /api/project/:id GET where the project does NOT exist', function (done) {
    chai.request(server)
    .get('/api/projects')
    .end(function(err, response){
      chai.request(server)
      .get('/api/project/57029ed4795118be119cc439')
      .end(function(err, res){
        expect(err).to.not.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.have.property('message');
        expect(res.body.error.message).to.equal('Cannot find the project');
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

  after(function(done){
    User.collection.remove();
    done();
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
      expect(res.body.category).to.include('JavaScript');
      done();
    });
  });

  it('should handle errors when adding a SINGLE project on /api/project POST', function(done) {
    var project = {
      name: "",
      category: [],
      image: "",
      created_on: "",
      link: "http://amazon.com",
      github_link: "",
      comments: "Comments Here",
      treehouse_comments: "Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)",
      grade: "Exceeds Expectations"
    };

    chai.request(server)
    .post('/api/new')
    .set(header,content)
    .send(project)
    .end(function(err, res){
      expect(err).to.not.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors.property[0].message).to.equal('Name is required');
      expect(res.body.errors.property[1].message).to.equal('Category is required');
      expect(res.body.errors.property[2].message).to.equal('Image is required');
      expect(res.body.errors.property[3].message).to.equal('Created on date is required');
      expect(res.body.errors.property[4].message).to.equal('Repository link is required');
      done();
    });
  });

  it('should update a SINGLE project on /api/edit/:id PUT', function (done) {
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

  it('should handle errors when updating a SINGLE project on /api/edit/:id PUT where the form is not complete', function (done) {
    var project = {
      name: "",
      category: "",
      image: "",
      created_on: "",
      link: "http://amazon.com",
      github_link: "",
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
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.property[0].message).to.equal('Name is required');
          expect(res.body.errors.property[1].message).to.equal('Category is required');
          expect(res.body.errors.property[2].message).to.equal('Image is required');
          expect(res.body.errors.property[3].message).to.equal('Created on date is required');
          expect(res.body.errors.property[4].message).to.equal('Repository link is required');
          done();
      });
    });
  });

  it('should handle errors when updating a SINGLE project on /api/edit/:id PUT where the project does not exist', function (done) {
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
        .put('/api/edit/57029ed4795118be119cc439')
        .set(header,content)
        .send(project)
        .end(function (error, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error.message).to.equal('Cannot find the project');
          done();
      });
    });
  });

  it('should add 1 like count to a SINGLE project on /api/like/:id PUT', function (done) {
    chai.request(server)
    .get('/api/projects')
    .end(function (err, response) {
      chai.request(server)
        .put('/api/like/' + response.body[0]._id)
        .send()
        .end(function (error, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('project');
          expect(res.body.project.ok).to.equal(1);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('You have added 1 like!');
          done();
      });
    });
  });

  it('should handle errors when adding 1 like count to a SINGLE project on /api/like/:id PUT where the project does not exist', function (done) {
    chai.request(server)
    .get('/api/projects')
    .end(function (err, response) {
      chai.request(server)
        .put('/api/like/57029ed4795118be119cc439')
        .send()
        .end(function (error, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('message');
          expect(res.body.error.message).to.equal('Cannot find the project');
          done();
      });
    });
  });

  // it('should upload a SINGLE file on /api/upload POST', function (done) {
  //   chai.request(server)
  //   .post('/api/upload')
  //   .set(header,content)
  //   .attach('imageField', fs.readFileSync(__dirname + '/test_images/treehouse.png'), 'treehouse.png')
  //   .end(function(err, res){
  //     expect(err).to.be.null;
  //     expect(res).to.have.status(200);
  //     // expect(res.body).to.be.a('object');
  //     // expect(res.body).to.have.property('message');
  //     // expect(res.body).to.have.property('errors');
  //     done();
  //   });
  // });

  // it('should delete a SINGLE project on /api/delete/:id DELETE');
});
