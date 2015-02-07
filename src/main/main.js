'use strict';
(function() {
  var angular = require('angular');
  window._ = require('lodash');

  // angular modules
  require('angular-ui-router');
  require('../js/templates');

  // application modules
  require('../services/_index');
  require('../component/_index');

  // pages
  require('../home/_index');
  require('../map/_index');
  require('../about/_index');

  // create and bootstrap application
  angular.element(document).ready(function() {

    var requires = [
      'ui.router',
      'templates',

      'ruuvi.home',
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
