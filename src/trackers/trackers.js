'use strict';

(function() {
  var module = require('./_index.js');
  var moment = require('moment');
  // @ngInject
  module.controller('TrackersPageCtrl', function(TrackerService, trackersData) {
    var self = this;
    // TODO is resolve in route a good thing?
    self.trackers = _.sortBy(trackersData.trackers, function(tracker) {
      if(tracker.latestActivity) {
        return -moment(tracker.latestActivity).unix();
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
                session.duration = moment(session.latestEventTime).diff(moment(session.latestEventTime));
                return session;
              })
              .sortBy(function(session) {
                return -moment(session.firstEventTime).unix();
              }).value();
        });
        // TODO handle error
      } else {
        tracker.sessions = undefined;
      }
    }

    function selectSession(session) {
      console.log('selected session', session);
    }

    self.selectSession = selectSession;
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
      controller: 'TrackerRowCtrl',
      controllerAs: 'ctrl',
    };
  }
  // @ngInject
  module.directive('trackerRow', trackerRow);
  // @ngInject
  module.controller('TrackerRowCtrl', TrackerRowCtrl);
})();
