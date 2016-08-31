'use strict';

import registerExpandDirective from './expandDirective';
import registerMixitupDirective from './mixItUpDirective';
import registerOwlDirective from './owlDirective';
import registerHamburgerDirective from './hamburgerDirective';
import registerValidationErrorsDirective from './validation-errors';

export default ngModule => {
  registerExpandDirective(ngModule);
  registerMixitupDirective(ngModule);
  registerOwlDirective(ngModule);
  registerHamburgerDirective(ngModule);
  registerValidationErrorsDirective(ngModule);
};
