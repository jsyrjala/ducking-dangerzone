'use strict';
(function() {
  var module = require('./_index');
  module.controller('LoginPageCtrl', function() {
  });

  /* <login-form></login-form> */
  module.directive('loginForm', function loginForm() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      controller: 'LoginFormCtrl as ctrl',
      templateUrl: 'login/login-form.html',
      bindToController: true,
    };
  });
  module.controller('LoginFormCtrl', function LoginFormCtrl(Config) {
    var self = this;
    self.data = {};
    self.appTitle = Config.appTitle;

    self.signIn = function (valid, data) {
      console.log('signIn', valid, data);
    };

    self.forgotPassword = function() {
      console.log('forgotPassword');
    };

  });
})();
