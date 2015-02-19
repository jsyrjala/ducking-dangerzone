'use strict';
(function() {
  var module = require('./_index');
  var angular = require('angular');

  require('leaflet.fullscreen');

  function mapComponent() {
    return {
      scope: {

      },
      restrict: 'E',
      replace: true,
      controller: 'MapComponentCtrl',
      templateUrl: 'map/map-component.html',
    };
  }

  function MapComponentCtrl($scope, MapService, leafletData) {
    angular.extend($scope, MapService.getMapDefaults());
    leafletData.getMap('map-view').then(function(map) {
      MapService.registerMap(map);
    });
  }

  // @ngInject
  module.directive('mapComponent', mapComponent);
  // @ngInject
  module.controller('MapComponentCtrl', MapComponentCtrl);

})();
