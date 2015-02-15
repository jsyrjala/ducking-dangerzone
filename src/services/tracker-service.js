'use strict';

(function() {
  var module = require('./_index');

  module.service('TrackerService', function TrackerService($resource, Config) {
    var self = this;
    function listTrackers() {
      return $resource(Config.server.url + '/trackers', {}, {}).get().$promise;
    }

    // API
    self.listTrackers = listTrackers;
  });
})();
