'use strict';
(function() {
  var module = require('./_index');
  require('leaflet');
  require('leaflet.fullscreen');

  // <map-view><map-view>
  function mapView() {
    function link(scope, element, attrs) {

      var map = L.map('map-view').setView([60.1708, 24.9375], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.control.fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
        title: 'Fullscreen', // change the title of the button, default Full Screen
        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
        forcePseudoFullscreen: false // force use of pseudo full screen even if full screen API is available, default false
      }).addTo(map);

      // events are fired when entering or exiting fullscreen.
      map.on('enterFullscreen', function(){
        console.log('entered fullscreen');
      });

      map.on('exitFullscreen', function(){
        console.log('exited fullscreen');
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
