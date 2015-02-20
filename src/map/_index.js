'use strict';
(function() {
  var angular = require('angular');
  module.exports = angular.module('ruuvi.home', []);
  require('./map.js');
  require('./map-service.js');
  require('./map-component.js');
  require('./map-menu.js');
  require('./map-draw.js');
})();
