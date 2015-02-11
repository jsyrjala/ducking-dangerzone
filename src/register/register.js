'use strict';
(function() {
  var module = require('./_index');
  module.controller('RegisterPageCtrl', function() {
  });

  /* <login-form></login-form> */
  module.directive('registerForm', function loginForm() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      controller: 'RegisterFormCtrl as ctrl',
      templateUrl: 'register/register-form.html',
      bindToController: true,
    };
  });
  module.controller('RegisterFormCtrl', function LoginFormCtrl(Config) {
    var self = this;
    self.data = {};
    self.appTitle = Config.appTitle;

    self.register = function (valid, form) {
      console.log('signIn', form, valid);
    };



  });
})();
