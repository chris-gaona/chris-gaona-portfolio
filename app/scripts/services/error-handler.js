'use strict';

var angular = require('angular');

function ErrorHandler(toastr, $log) {
  var vm = this;

  vm.handleError = function(response, displayValidationErrorsCallback) {
    if (response.status === 400 && displayValidationErrorsCallback) {
      toastr.error('Please see above', 'Form Errors!');
      displayValidationErrorsCallback(response.data);
    } else {
      var message = response && response.data && response.data.message;
      if (!message) {
        message = 'Message not available. Please see the console for more details.';
      }
      toastr.error(message, 'Unexpected Error');

      // log the entire response to the console
      $log.error(response);
    }
  };
}

angular.module('app')
.service('errorHandlerService', ErrorHandler);
