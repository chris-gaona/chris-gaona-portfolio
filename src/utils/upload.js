'use strict';

var fs = require('fs');
var aws = require('aws-sdk');
var imagemin = require('imagemin');
var imageminPngquant = require('imagemin-pngquant');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
// var S3_BUCKET = process.env.S3_BUCKET;

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
    console.log(fileOfImage);

    var postImage = {Bucket: 'chrisgaonaportfolio', Key: 'images/' + originalName, Body: fileOfImage, ACL: 'public-read'};

    //Amazon s3 access
    s3.putObject(postImage, function(err) {
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

module.exports = uploadImage;
