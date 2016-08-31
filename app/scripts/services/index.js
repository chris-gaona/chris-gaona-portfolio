'use strict';

module.exports = function(ngModule) {
  require('./mainService.js')(ngModule);
  require('./authService.js')(ngModule);
  require('./userService.js')(ngModule);
  require('./weatherService.js')(ngModule);
  require('./error-handler.js')(ngModule);
};
