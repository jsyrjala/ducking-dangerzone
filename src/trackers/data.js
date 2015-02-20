'use strict';

(function() {
  var module = require('./_index.js');
  // Contains data for currently selected trackers
  // @ngInject
  module.service('SelectedSessions', function(TrackerService) {
    var self = this;
    var sessions = {};
    function addSession(session) {
      console.log('selected session', session);

      var sessionData = {
        session: session,
        events: [],
      };
      sessions[session.id] = sessionData;
      TrackerService.listEvents(session).then(function(data) {
        // TODO notify map to draw these
        sessionData.events.push(data.events);
      });
    }
    function removeSession(session) {
      delete sessions[session.id];
    }

    self.addSession = addSession;
    self.removeSession = removeSession;
  });

})();
