'use strict';

(function() {
  var module = require('./_index');

  module.service('TrackerService', function TrackerService($resource, Config) {
    var self = this;
    function transform(data) {
      return window.walkTree(JSON.parse(data), window.convertKey);
    }
    var getOpts = {get: {
      transformResponse: transform
    }};
    var trackerResource = $resource(Config.server.url + '/trackers',
            {}, getOpts);

    var sessionsResource = $resource(Config.server.url + '/trackers/:trackerId/sessions',
            {}, getOpts);

    function listTrackers() {
      return trackerResource.get().$promise;
    }

    function listSessions(tracker) {
      return sessionsResource.get({trackerId: tracker.id}).$promise;
    }
    // API
    self.listTrackers = listTrackers;
    self.listSessions = listSessions;
  });
})();
