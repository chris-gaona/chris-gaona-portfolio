
'use strict';

// database configuration

var config = {};
var MONGODB_URI = process.env.MONGODB_URI;

config.mongoURI = {
  development: 'mongodb://localhost/portfolio',
  test: 'mongodb://localhost/portfolio-test',
  production: MONGODB_URI
};

module.exports = config;
