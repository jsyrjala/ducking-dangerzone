'use strict';

(function() {
  var module = require('./_index');

  module.service('TrackerService', function TrackerService($resource, Config) {
    var self = this;
    function listTrackers() {
      return $resource(Config.server.url + '/trackers',
              {}, {}).get().$promise;
    }

    function listSessions(tracker) {
      return $resource(Config.server.url + '/trackers/:trackerId/sessions',
              {trackerId: tracker.id}, {}).get().$promise;
    }
    // API
    self.listTrackers = listTrackers;
    self.listSessions = listSessions;
  });
})();
