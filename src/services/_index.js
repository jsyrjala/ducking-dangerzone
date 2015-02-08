'use strict';

(function() {
  var angular = require('angular');

  module.exports = angular.module('ruuvi.services', []);

  // Define the list of services here
  require('./example.js');
  require('./map-service.js');
})();
