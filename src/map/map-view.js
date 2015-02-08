'use strict';
(function() {
  var module = require('./_index');
  require('leaflet.fullscreen');

  // <map-view><map-view>
  function mapView(Config, MapService) {
    function link(scope, element) {
      MapService.createMapComponent(element[0]);
    }
    return {
      scope: {

      },
      link: link,
      restrict: 'E',
      replace: true,
      controller: 'MapViewCtrl',
      templateUrl: 'map/map-view.html',
    };
  }
  // @ngInject
  module.directive('mapView', mapView);
  function MapViewCtrl() {
    console.log('MapViewCtrl');
  }
  // @ngInject
  module.controller('MapViewCtrl', MapViewCtrl);
})();
