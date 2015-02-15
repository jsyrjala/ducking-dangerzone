'use strict';
(function() {
  var module = require('./_index');
  require('../services/_index');
  /**
   * @ngInject
   */
  function HomePageCtrl() {
    _.map([1, 2, 3], function(e) {
      console.log('lodash', e);
    });
    var self = this;
    self.title = 'AngularJS, Gulp, and Browserify!';
    self.number = 1234;
  }
  module.controller('HomePageCtrl', HomePageCtrl);

  /** <show-data></show-data> */
  function ShowData() {
    return {
      scope: {},
      restrict: 'E',
      replace: false,
      controller: 'ShowDataCtrl',
      templateUrl: 'home/showData.html',
    };
  }
  function ShowDataCtrl($scope) {
    console.log('ShowDataCtrl running');
    $scope.title = 'my title in ShowDataCtrl';
    $scope.query = function() {
    };
  }
  module.directive('showData', ShowData);
  module.controller('ShowDataCtrl', ShowDataCtrl);

})();
