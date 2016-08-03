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

// get specific project
router.get('/project/:id', function (req, res, next) {
  Project.findOne({_id: req.params.id}, function(err, project){
      if(err){ return next(err); }

      res.json(project);
    });
  // res.status(200).json('You hit the GET projects api route');
});

router.post('/new', function (req, res, next) {
  var project = new Project(req.body);

  project.save(function(err, project){
    if(err){ return next(err); }

    res.json(project);
  });
  // res.status(201).json('You hit the POST projects api route');
});

router.put('/edit/:id', function (req, res, next) {
  var project = req.body;
  Project.findByIdAndUpdate(req.params.id, project, {new: true}, function(err, project) {
    if(err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'project': project, message: 'Project Updated'});
  });
  // res.status(201).json('You hit the POST projects api route');
});

module.exports = router;
