'use strict';

// creates error handler function
function ErrorHandler(toastr, $log) {
  var vm = this;

  // creates handle error function
  vm.handleError = function(response, displayValidationErrorsCallback) {
    // if the error has status 400 meaning there are form issues
    if (response.status === 400 && displayValidationErrorsCallback) {
      // tell user to fix the form issues
      toastr.error('Please see above', 'Form Errors!');
      displayValidationErrorsCallback(response.data);
    } else {
      // else display the message to the user
      var message = response && response.statusText;

      if (message) {
        toastr.error(message, 'Uh oh!');
      } else {
        message = 'Message not available.';
        toastr.error(message, 'Unexpected Error');
      }

      // log the entire response to the console
      $log.error(response);
    }
  };
}

module.exports = function(ngModule) {
  ngModule.service('errorHandlerService', ErrorHandler);
};
