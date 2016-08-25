'use strict';

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

function newProject (req, res, next) {
  var project = new Project(req.body);

  // save the project
  project.save(function(err, project){
    if (err) {
      // check for validation errors
      if (err.name === 'ValidationError') {
        var errorArray = [];

        if (err.errors.name) {
          errorArray.push({ code: 400, message: err.errors.name.message });
        }

        if (err.errors.category) {
          errorArray.push({ code: 400, message: err.errors.category.message });
        }

        if (err.errors.image) {
          errorArray.push({ code: 400, message: err.errors.image.message });
        }

        if (err.errors.created_on) {
          errorArray.push({ code: 400, message: err.errors.created_on.message });
        }

        if (err.errors.github_link) {
          errorArray.push({ code: 400, message: err.errors.github_link.message });
        }

        var errorMessages = { message: 'Validation Failed', errors: { property: errorArray}};

        return res.status(400).json(errorMessages);
      } else {
        return next(err);
      }
    }

    //send the project
    res.status(201).json(project);
  });
}

module.exports = newProject;
