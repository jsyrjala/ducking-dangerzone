'use strict';

(function() {
  var angular = require('angular');

  module.exports = angular.module('ruuvi.services', ['ngResource']);

  // Define the list of services here
  require('./login-service.js');
  require('./user-service.js');
  require('./tracker-service.js');
  require('./event-service.js');
  require('./storage-service.js');
  require('./websocket.js');
  require('./util.js');

})();
