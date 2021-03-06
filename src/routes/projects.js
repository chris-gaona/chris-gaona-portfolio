'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

var jwt = require('express-jwt');
var jwtSecret;

if (process.env.JWT_SIGNATURE !== undefined) {
  jwtSecret = process.env.JWT_SIGNATURE;
} else {
  jwtSecret = 'SECRET';
}

//middleware for authenticating jwt tokens
var auth = jwt({
  secret: jwtSecret,
  userProperty: 'payload'
});

// UTILS
var utils = require('../utils');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'dist/public/images/temp/',
  filename: function ( req, file, cb ) {
    //req.body is empty...
    cb( null, file.originalname );
  }
});

var upload = multer({ storage: storage });
// var upload = multer({ dest : 'dist/public/images/' });

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
      var error = new Error('Cannot find the project');
      error.status = 404;
      return next(error);
    }

    // sets course to req.project to be passed to next handler
    req.project = project;
    return next();
  });
});

// get all projects
router.get('/projects', function (req, res, next) {
  utils.getAll(req, res, next);
});

// get specific project
router.get('/project/:id', function (req, res) {
  res.json(req.project);
});

// create a new project
router.post('/new', auth, function (req, res, next) {
  utils.newProject(req, res, next);
});

// edit an existing project
router.put('/edit/:id', auth, function (req, res, next) {
  utils.editProject(req, res, next);
});

// add 1 like count to a specific project
router.put('/like/:id', function (req, res, next) {
  // utils.editProject(req, res, next);
  req.project.update({ $inc: { likes: 1 }}, function (err, project) {
    if (err) return next(err);
    res.status(201).json({project: project, message: 'You have added 1 like!'});
  });
});

// upload a picture to amazon s3
router.post('/upload', [auth, upload.single('file')], function (req, res, next) {
  utils.upload(req, res, next);
});

module.exports = router;
