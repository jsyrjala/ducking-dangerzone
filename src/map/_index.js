'use strict';
(function() {
  var angular = require('angular');
  module.exports = angular.module('ruuvi.home', []);
  require('./map.js');
  require('./map-view.js');
  require('./map-menu.js');

})();
