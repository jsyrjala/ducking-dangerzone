'use strict';

(function() {
  var module = require('./_index');
  var moment = require('moment');

  /* <a ng-click="foo()" prevent-default>
   * Prevents event bubbling to other events from dblclick events.
   */
  module.directive('preventDefault', function preventDefault() {
    return {
      restrict: 'A',
      link: function(scope, elem) {
          elem.on('dblclick', function(e){
            console.log('dblclick');
            e.preventDefault();
            e.stopPropagation();
          });
        }
      };
  });

  /** {{value | timeAgo}} */
  module.filter('timeAgo', function timeAgo() {
    return function(input) {
      if(!input) {
        return input;
      }
      try {
        return moment(input).fromNow();
      } catch(e) {
        return input;
      }
    };
  });
})();
