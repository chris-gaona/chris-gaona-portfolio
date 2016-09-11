'use strict';

module.exports = function(ngModule) {
  require('./expandDirective')(ngModule);
  require('./mixItUpDirective')(ngModule);
  require('./owlDirective')(ngModule);
  require('./hamburgerDirective')(ngModule);
  require('./validation-errors')(ngModule);
  require('./imageLoadDirective')(ngModule);
  require('./dashboardDirective')(ngModule);
  require('./budgetDirective')(ngModule);
};
