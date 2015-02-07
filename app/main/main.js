'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('../js/templates');

require('../home/_index');
require('../services/_index');

window._ = require('lodash');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'ruuvi.home',
    'ruuvi.services',
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./routes'));

  angular.module('app').run(require('./on_run'));

  angular.bootstrap(document, ['app']);

});
