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
      controller: 'LoginFormCtrl as loginForm',
      templateUrl: 'login/login-form.html',
      bindToController: true,
    };
  });
  module.controller('LoginFormCtrl', function LoginFormCtrl(Config) {
    var self = this;
    self.form = {};
    self.appTitle = Config.appTitle;

    self.signIn = function (form) {
      console.log('signIn', form);
    };

    self.forgotPassword = function() {
      console.log('forgotPassword');
    };

  });
})();
