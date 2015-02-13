'use strict';
(function() {
  var module = require('./_index');
  require('leaflet.fullscreen');

  // <map-view><map-view>
  function mapView(Config, MapService, $window) {
    function link(scope, element) {
      MapService.openMap(element[0]);
      /*
      resize code
      var elem = $(element[0]);
      $($window).on('resize', function() {
        elem.height($(window).height())
                    .width($(window).width());
        MapService.invalidateSize();
      }).trigger('resize');
      */
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
