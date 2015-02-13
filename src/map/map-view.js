'use strict';
(function() {
  var module = require('./_index');
  require('leaflet.fullscreen');

  // <map-view><map-view>
  function mapView(Config, MapService, $window, $interval) {
    function link(scope, element) {
      MapService.openMap(element[0]);

      var windowInnerHeight = window.innerHeight;
      function resize() {
        windowInnerHeight = $window.innerHeight;
        elem.height($(window).height())
                    .width($(window).width());
        MapService.invalidateSize();
      }
      var elem = $(element[0]);
      $($window).on('resize', resize).trigger('resize');

      var poller = $interval(function() {
        if (windowInnerHeight !== $window.innerHeight) {
          resize();
        }
      }, 250);

      scope.$on('$destroy', function() {
        $($window).off('resize', resize);
        $interval.cancel(poller);
      });

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
