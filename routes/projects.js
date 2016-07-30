var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

router.get('/projects', function (req, res, next) {
  // Project.find(function(err, projects){
  //     if(err){ return next(err); }
  //
  //     res.json(projects);
  //   });
  res.status(200).json('You hit the projects api route');
});

module.exports = router;
