'use strict';

var angular = require('angular');

angular.module('app', [require('angular-route'), require('angular-scroll'), require('angular-animate'), require('angular-toastr')]);

require('./scripts/config/route-config.js');
require('./scripts/controllers/mainController.js');
require('./scripts/controllers/projectController.js');
require('./scripts/directives/expandDirective.js');
require('./scripts/directives/mixItUpDirective.js');
require('./scripts/directives/owlDirective.js');
require('./scripts/directives/validation-errors.js');
require('./scripts/services/mainService.js');
require('./scripts/services/error-handler.js');
