'use strict';

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

function getAll (req, res, next) {
  Project.find(function(err, projects){
    if(err) { return next(err); }

    if (projects.length === 0) {
      var error = new Error('No projects yet');
      error.status = 200;
      return next(error);
    }

    // send projects
    res.json(projects);
  });
}

module.exports = getAll;
