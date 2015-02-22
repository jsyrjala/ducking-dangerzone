'use strict';
(function() {
  var module = require('./_index');
  require('../services/_index');
  /**
   * @ngInject
   */
  function HomePageCtrl(Config) {
    var self = this;
    self.title = Config.appTitle;
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
  // @ngInject
  function ShowDataCtrl($scope, Config) {
    console.log('ShowDataCtrl running');
    $scope.title = 'my title in ShowDataCtrl';
    $scope.query = function() {
    };
  }
  module.directive('showData', ShowData);
  module.controller('ShowDataCtrl', ShowDataCtrl);

})();
