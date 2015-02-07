'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('../js/templates');
require('../js/controllers/_index');
require('../js/services/_index');
require('../js/directives/_index');

window._ = require('lodash');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'app.controllers',
    'app.services',
    'app.directives'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./routes'));

  angular.module('app').run(require('./on_run'));

  angular.bootstrap(document, ['app']);

});
