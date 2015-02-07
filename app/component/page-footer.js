'use strict';
(function() {
  var module = require('./_index');

  module.directive('pageFooter', function pageFooter() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      templateUrl: 'component/page-footer.html',
    };
  });
})();
