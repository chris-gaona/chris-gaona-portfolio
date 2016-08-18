
'use strict';

// database configuration

var config = {};
var MODULUS_USERNAME = process.env.MODULUS_USERNAME;
var MODULUS_PASSWORD = process.env.MODULUS_PASSWORD;

config.mongoURI = {
  development: 'mongodb://localhost/portfolio',
  test: 'mongodb://localhost/portfolio-test',
  production: 'mongodb://' + MODULUS_USERNAME + ':' + MODULUS_PASSWORD + '@jello.modulusmongo.net:27017/hibIdi9s'
};

module.exports = config;
