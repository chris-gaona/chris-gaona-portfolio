
'use strict';

// database configuration

var config = {};
var MODULUS_USERNAME = process.env.MODULUS_USERNAME;
var MODULUS_PASSWORD = process.env.MODULUS_PASSWORD;
var MODULUS_TEST_USERNAME = process.env.MODULUS_TEST_USERNAME;
var MODULUS_TEST_PASSWORD = process.env.MODULUS_TEST_PASSWORD;
var testDB;

if (MODULUS_TEST_USERNAME !== undefined && MODULUS_TEST_PASSWORD !== undefined) {
  testDB = 'mongodb://' + MODULUS_TEST_USERNAME + ':' + MODULUS_TEST_PASSWORD + '@jello.modulusmongo.net:27017/xabeGi8m';
} else {
  testDB = 'mongodb://localhost/portfolio-test';
}

config.mongoURI = {
  development: 'mongodb://localhost/portfolio',
  test: testDB,
  production: 'mongodb://' + MODULUS_USERNAME + ':' + MODULUS_PASSWORD + '@jello.modulusmongo.net:27017/hibIdi9s'
};

module.exports = config;
