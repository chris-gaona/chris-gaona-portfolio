
'use strict';

var config = {};
// var MODULUS_USERNAME = process.env.MODULUS_USERNAME;
// var MODULUS_PASSWORD = process.env.MODULUS_PASSWORD;

config.mongoURI = {
  development: 'mongodb://localhost/portfolio',
  test: 'mongodb://localhost/portfolio-test'
};

module.exports = config;
