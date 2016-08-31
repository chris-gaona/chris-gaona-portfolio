'use strict';

import registerMainService from './mainService';
import registerAuthService from './authService';
import registerUserService from './userService';
import registerWeatherService from './weatherService';
import registerErrorHandlerService from './error-handler';

export default ngModule => {
  registerMainService(ngModule);
  registerAuthService(ngModule);
  registerUserService(ngModule);
  registerWeatherService(ngModule);
  registerErrorHandlerService(ngModule);
};
