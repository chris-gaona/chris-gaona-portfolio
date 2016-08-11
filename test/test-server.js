'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var siteURL = 'http://localhost:3000';

chai.use(chaiHttp);

describe('Projects', function () {
  it('should list ALL projects on /projects GET', function (done) {
    chai.request(siteURL)
    .get('/api/projects')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      done();
    });
  });
  it('should list a SINGLE project on /project/:id GET');
  it('should add a SINGLE project on /project POST', function(done) {
    chai.request(siteURL)
    .post('/api/new')
    .send({
      "name": "Random Quote Generator",
      "category": "JavaScript",
      "image": "../images/random-quote-generator.png",
      "created_on": "2016-07-24T07:00:00.000Z",
      "link": "http://amazon.com",
      "github_link": "https://github.com/chris-gaona/random-quote",
      "comments": "Comments Here",
      "treehouse_comments": "Chris, great work on your Random Quotes Generator! You really went above and beyond to meet the Exceeds requirements. I hope you enjoyed this project and learn so much throughout the rest of the TechDegree. Keep pushing yourself for Exceeds! :)",
      "grade": "Exceeds Expectations"
    })
    .end(function(err, res){
      expect(err).to.be.null;
      expect(res).to.have.status(200);
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
  it('should update a SINGLE project on /project/:id PUT');
  it('should delete a SINGLE project on /project/:id DELETE');
});
