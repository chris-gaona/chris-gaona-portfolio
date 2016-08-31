'use strict';

import registerMainCtrl from './mainController';
import registerProjectCtrl from './projectController';
import registerAuthCtrl from './authController';

export default ngModule => {
  registerMainCtrl(ngModule);
  registerProjectCtrl(ngModule);
  registerAuthCtrl(ngModule);
};
