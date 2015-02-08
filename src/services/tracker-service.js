'use strict';

(function() {
  var module = require('./_index');

  module.service('TrackerService', function TrackerService($resource, Config) {
    var self = this;
    self.listTrackers = function() {
      return $resource(Config.server.url + '/trackers', {}, {}).get().$promise;
    };
  });
})();
