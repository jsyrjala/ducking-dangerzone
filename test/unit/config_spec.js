/*global angular */

'use strict';

describe('Unit: Config', function() {

  var config;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the directive
    angular.mock.inject(function(Config) {
      config = Config;
    });
  });

  it('should exist', function() {
    expect(config).toBeDefined();
  });

  it('should have an application name', function() {
    expect(config.appTitle).toEqual('RuuviTracker Explorer');
  });

});
