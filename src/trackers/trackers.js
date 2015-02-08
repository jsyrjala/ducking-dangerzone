'use strict';

(function() {
  var module = require('./_index.js');
  module.controller('TrackersPageCtrl', function(TrackerService) {
    console.log('TrackersPageCtrl');
    var self = this;
    TrackerService.listTrackers().then(function(response) {
      self.trackers  = response.trackers;
    });
  });
})();
