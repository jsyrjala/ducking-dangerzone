'use strict';
(function() {
  var module = require('./_index');

  /** <page></page> */
  module.directive('page', function page() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      templateUrl: 'component/page.html',
      controller: 'PageCtrl',
      controllerAs: 'page',
      bindToController: true,
      transclude: true,
    };
  });

  module.controller('PageCtrl', function PageCtrl() {

  });

})();
