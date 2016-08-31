'use strict';

module.exports = function(ngModule) {
  require('./mainController.js')(ngModule);
  require('./projectController.js')(ngModule);
  require('./authController.js')(ngModule);
};
