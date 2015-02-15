'use strict';

(function() {
  //var L = require('leaflet');

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
    };
  });

})();
