'use strict';

var controllersModule = require('./_index');
require('../services/_index');
/**
 * @ngInject
 */
function ExampleCtrl() {

  _.map([1, 2, 3], function(e) {
    console.log('lodash', e);
  });
  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

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

function ShowDataCtrl($scope, ExampleService) {
  console.log('ShowDataCtrl running');
  $scope.title = 'my title in ShowDataCtrl';
  $scope.query = function() {
    ExampleService.get();
  };
}

controllersModule.controller('ExampleCtrl', ExampleCtrl);
controllersModule.directive('showData', ShowData);
controllersModule.controller('ShowDataCtrl', ShowDataCtrl);
