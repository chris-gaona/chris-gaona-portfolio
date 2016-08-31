'use strict';

module.exports = function(ngModule) {
  require('./expandDirective.js')(ngModule);
  require('./mixItUpDirective.js')(ngModule);
  require('./owlDirective.js')(ngModule);
  require('./hamburgerDirective.js')(ngModule);
  require('./validation-errors.js')(ngModule);
};
