'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ExampleCtrl() {

  _.map([1, 2, 3], function(e) {
    console.log('lodash', e);
  });
  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

}

controllersModule.controller('ExampleCtrl', ExampleCtrl);
