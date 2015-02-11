'use strict';

(function() {
  var module = require('./_index.js');
  module.controller('TrackersPageCtrl', function(TrackerService, trackersData) {
    var self = this;
    self.trackers = trackersData.trackers;
  });
})();
