'use strict';

module.exports = function(ngModule) {
  require('./mainController')(ngModule);
  require('./projectController')(ngModule);
  require('./authController')(ngModule);
  require('./resumeController')(ngModule);
};
