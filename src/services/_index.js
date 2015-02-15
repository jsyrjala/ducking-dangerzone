'use strict';

(function() {
  var angular = require('angular');

  module.exports = angular.module('ruuvi.services', ['ngResource']);

  // Define the list of services here
  require('./map-service.js');
  require('./login-service.js');
  require('./user-service.js');
  require('./tracker-service.js');
  require('./storage-service.js');
  require('./util.js');

})();
