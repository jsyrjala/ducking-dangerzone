'use strict';

(function() {
  var module = require('./_index.js');
  var moment = require('moment');
  // @ngInject
  module.controller('TrackersPageCtrl', function(trackersData, SelectedTrackers) {
    var self = this;
    // TODO is resolve in route a good thing?
    self.trackers = _.chain(trackersData.trackers).sortBy(function(tracker) {
      if(tracker.latestActivity) {
        return -moment(tracker.latestActivity).unix();
      }
      return -moment(0).unix();
    }).map(function(tracker) {
      tracker.following = SelectedTrackers.isSelected(tracker);
      return tracker;
    }).value();
  });

  function TrackerRowCtrl(TrackerService, SelectedTrackers, SelectedSessions) {
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
                session.selected = SelectedSessions.isSelected(session);
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
      if(session.selected) {
        SelectedSessions.removeSession(session);
      } else {
        SelectedSessions.addSession(session);
      }
      session.selected = !session.selected;
    }

    function followTracker(tracker) {
      if(tracker.following) {
        console.log('stop following tracker', tracker);
        SelectedTrackers.removeTracker(tracker);
      } else {
        console.log('start following tracker', tracker);
        SelectedTrackers.addTracker(tracker);
      }
      tracker.following = !tracker.following;
    }

    self.followTracker = followTracker;
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
