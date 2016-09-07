'use strict';

var fs = require('fs');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

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

var aws = require('aws-sdk');

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

if (AWS_ACCESS_KEY && AWS_SECRET_KEY) {
  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region:'us-east-1'
  });
} else {
  aws.config.loadFromPath('src/config/config.json');
}

var s3 = new aws.S3();

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

var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');

router.post('/upload', upload.single('file'), function (req, res, next) {
  // utils.upload(req, res, next);
  uploadImage(req, res, next);
});

function uploadImage (req, res, next) {
  var originalName = req.file.originalname;

  imagemin(['dist/public/images/temp/*.{jpg,png}'], 'dist/public/images/temp/', {
    plugins: [
      imageminPngquant({quality: '65-80'})
    ]
  }).then(function (files) {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]

    var fileOfImage = fs.readFileSync('dist/public/images/temp/' + originalName);

    var postImage = {Bucket: 'chrisgaonaportfolio', Key: 'images/' + originalName, Body: fileOfImage, ACL: 'public-read'};

    //Amazon s3 access
    s3.putObject(postImage, function(err, data) {
      if (err) {
        // console.log(err);
        return next(err);
      }

      console.log('Successfully added image to Amazon s3!');

      fs.unlink('dist/public/images/temp/' + req.file.originalname, function(err) {
         if (err) {
            return next(err);
         }
         console.log("File deleted successfully!");
         res.send('Uploaded!');
      });
    });
  });
}

module.exports = router;
