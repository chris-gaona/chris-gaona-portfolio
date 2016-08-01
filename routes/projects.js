var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

router.get('/projects', function (req, res, next) {
  Project.find(function(err, projects){
      if(err){ return next(err); }

      res.json(projects);
    });
  // res.status(200).json('You hit the GET projects api route');
});

router.post('/projects', function (req, res, next) {
  var project = new Project(req.body);

  project.save(function(err, project){
      if(err){ return next(err); }

      res.json('Success!: ' + project);
    });
  // res.status(201).json('You hit the POST projects api route');
});

module.exports = router;
