'use strict';

module.exports = function(ngModule) {
  require('./mainService')(ngModule);
  require('./authService')(ngModule);
  require('./userService')(ngModule);
  require('./weatherService')(ngModule);
  require('./error-handler')(ngModule);
  require('./dashboardService')(ngModule);
};
