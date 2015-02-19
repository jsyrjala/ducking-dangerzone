'use strict';

(function() {
  var module = require('./_index.js');
  var moment = require('moment');
  // @ngInject
  module.controller('TrackersPageCtrl', function(TrackerService, trackersData) {
    var self = this;
    // TODO is resolve in route a good thing?
    self.trackers = _.sortBy(trackersData.trackers, function(tracker) {
      if(tracker.latest_activity) {
        return -moment(tracker.latest_activity).unix();
      }
      return -moment(0).unix();
    });
  });

  function TrackerRowCtrl(TrackerService) {
    var self = this;
    self.showDetails = false;


    function toggleDetails(tracker) {
      self.showDetails = !self.showDetails;
      if(self.showDetails) {
        tracker.sessions = undefined;
        TrackerService.listSessions(tracker).then(function(data) {
          tracker.sessions = _.chain(data.sessions)
              .map(function(session) {
                session.duration = moment(session.latest_event_time).diff(moment(session.first_event_time));
                return session;
              })
              .sortBy(function(session) {
                return -moment(session.first_event_time).unix();
              }).value();
        });
        // TODO handle error
      } else {
        tracker.sessions = undefined;
      }
    }

    self.toggleDetails = toggleDetails;
  }

  function trackerRow() {
    return {
      scope: {
        tracker: '=',
      },
      replace: true,
      restrict: 'E',
      templateUrl: 'trackers/tracker-row.html',
      controller: TrackerRowCtrl,
      controllerAs: 'ctrl',
    };
  }
  // @ngInject
  module.directive('trackerRow', trackerRow);
})();
