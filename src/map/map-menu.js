'use strict';

(function() {
  var module = require('./_index');

  /** <map-menu></map-menu> */
  module.directive('mapMenu', function mapMenu() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      controller: 'MapMenuCtrl as ctrl',
      templateUrl: 'map/map-menu.html',
    };
  });
  module.controller('MapMenuCtrl', function MapMenuCtrl($scope, MapService, CurrentLocation) {
    var self = this;
    self.tracking = false;
    self.locateMe = function() {
      MapService.center(CurrentLocation.get());
    };
    self.toggleTracking = function() {
      self.tracking = !self.tracking;
      console.log('toggle tracking', self.tracking );
      // TODO implement
      // TODO add listener for map.locate changes that sends location to server
      // TODO check that sending works while map is not visible
    };
    $scope.$on('$destroy', function() {
      MapService.reset();
    });

  });

})();
