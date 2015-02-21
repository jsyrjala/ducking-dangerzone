'use strict';
(function() {
  var angular = require('angular');
  window._ = require('lodash');

  // angular modules
  require('angular-ui-router');
  require('angular-animate');
  require('angular-resource');
  require('angular-messages');
  require('angular-leaflet-directive');

  require('../vendor/angular-websocket');

  // cached templates
  require('../js/templates');

  // application modules
  require('../services/_index');
  require('../component/_index');

  // pages
  require('../home/_index');
  require('../login/_index');
  require('../register/_index');
  require('../trackers/_index');
  require('../map/_index');
  require('../about/_index');

  // create and bootstrap application
  angular.element(document).ready(function() {

    var requires = [
      'ngAnimate',
      'ngMessages',
      'ui.router',
      'templates',
      'leaflet-directive',
      'ngWebSocket',

      'ruuvi.home',
      'ruuvi.login',
      'ruuvi.register',
      'ruuvi.trackers',
      'ruuvi.map',
      'ruuvi.about',

      'ruuvi.component',
      'ruuvi.services',
    ];

    // mount on window for testing
    window.app = angular.module('app', requires);

    angular.module('app').constant('Config', require('./config'));

    angular.module('app').config(require('./routes'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

  });
})();
