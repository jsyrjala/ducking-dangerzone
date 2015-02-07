'use strict';
(function() {
  var angular = require('angular');
  window._ = require('lodash');

  // angular modules
  require('angular-ui-router');
  require('../js/templates');

  // application modules
  require('../home/_index');
  require('../services/_index');
  require('../component/_index');


  // create and bootstrap application
  angular.element(document).ready(function() {

    var requires = [
      'ui.router',
      'templates',
      'ruuvi.home',
      'ruuvi.component',
      'ruuvi.services',
    ];

    // mount on window for testing
    window.app = angular.module('app', requires);

    angular.module('app').constant('AppSettings', require('./constants'));

    angular.module('app').config(require('./routes'));

    angular.module('app').run(require('./on_run'));

    angular.bootstrap(document, ['app']);

  });
})();
