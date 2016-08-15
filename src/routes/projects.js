'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

var jwt = require('express-jwt');
//middleware for authenticating jwt tokens
var auth = jwt({
  secret: 'SECRET', // TODO this should be stored in an ENV variable and kept off the codebase, same as it is in the User model
  userProperty: 'payload'
});

// creates middleware for all course urls to go through first
router.param('id', function (req, res, next, id) {
  // populates reviews in Course model
  var query = Project.findById(id);

  // executes the query
  query.exec(function (err, project) {
    // if err pass the error onto the next error handler
    if (err) { return next(err); }

    // if there is no course return error to error handler saying can't find the course
    if (!project) {
      return next(new Error('can\'t find project'));
    }

    // sets course to req.course to be passed to next handler
    req.project = project;
    return next();
  });
});

router.get('/projects', function (req, res, next) {
  Project.find(function(err, projects){
      if(err){ return next(err); }

      res.json(projects);
    });
  // res.status(200).json('You hit the GET projects api route');
});

// get specific project
router.get('/project/:id', function (req, res, next) {
  res.json(req.project);
});

router.post('/new', auth, function (req, res, next) {
  var project = new Project(req.body);

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

    res.json(project);
  });
  // res.status(201).json('You hit the POST projects api route');
});

router.put('/edit/:id', auth, function (req, res, next) {
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

    res.json({project: project, message: 'Project Updated'});
  });
  // res.status(201).json('You hit the POST projects api route');
});

module.exports = router;
