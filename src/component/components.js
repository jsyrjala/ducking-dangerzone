'use strict';

(function() {
  var module = require('./_index');

  /* <a ng-click="foo()" prevent-default>
   * Prevents event bubbling to other events from click and dblclick events.
   */
  module.directive('preventDefault', function preventDefault() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
          elem.on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
          });
          elem.on('dblclick', function(e){
            e.preventDefault();
            e.stopPropagation();
          });
        }
      };
  });
})();
