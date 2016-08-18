'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

var jwt = require('express-jwt');
var jwtSecret;

if (process.env.JWT_SIGNATURE) {
  jwtSecret = process.env.JWT_SIGNATURE;
} else {
  jwtSecret = 'SECRET';
}

//middleware for authenticating jwt tokens
var auth = jwt({
  secret: jwtSecret,
  userProperty: 'payload'
});

// creates middleware for all project urls to go through first
router.param('id', function (req, res, next, id) {
  // query to find specific project by ID
  var query = Project.findById(id);

  // executes the query
  query.exec(function (err, project) {
    // if err pass the error onto the next error handler
    if (err) { return next(err); }

    // if there is no project return error to error handler saying can't find the course
    if (!project) {
      return next(new Error('can\'t find project'));
    }

    // sets course to req.project to be passed to next handler
    req.project = project;
    return next();
  });
});

// get all projects
router.get('/projects', function (req, res, next) {
  Project.find(function(err, projects){
      if(err){ return next(err); }

      // send projects
      res.json(projects);
    });
});

// get specific project
router.get('/project/:id', function (req, res) {
  res.json(req.project);
});

// create a new project
router.post('/new', auth, function (req, res, next) {
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
    res.json(project);
  });
});

// edit an existing project
router.put('/edit/:id', auth, function (req, res, next) {
  // runValidators makes it so the updated values are validated again before saving
  req.project.update(req.body, { runValidators: true }, function (err, project) {
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

    // send project
    res.json({project: project, message: 'Project Updated'});
  });
});

module.exports = router;
