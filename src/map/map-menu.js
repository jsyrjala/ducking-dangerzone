'use strict';

(function() {
  var L = require('leaflet');

  var module = require('./_index');
  module.directive('mapMenu', function mapMenu() {
    return {
      scope: {},
      restrict: 'E',
      replace: true,
      controller: 'MapMenuCtrl as mapMenu',
      templateUrl: 'map/map-menu.html',
    };
  });
  module.controller('MapMenuCtrl', function MapMenuCtrl() {
    console.log('mapmenu');
    var self = this;
    self.showContent = false;
    self.openMenu = function() {
      console.log('open menu');
      self.showContent = !self.showContent;
    };

  });

})();
