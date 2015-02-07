'use strict';
(function() {
  var module = require('./_index');

  /** <page></page> */
  module.directive('navi', function navi() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      templateUrl: 'component/navi.html',
      controller: 'NaviCtrl',
      controllerAs: 'navi',
      bindToController: true,
    };
  });

  module.controller('NaviCtrl', function NaviCtrl() {

  });

})();
