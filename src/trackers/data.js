'use strict';

(function() {
  var module = require('./_index.js');

  // @ngInject
  module.service('SelectedTrackers', function(TrackerService, WebSocket, Storage) {
    var self = this;
    var trackers = {};
    var storageKey = 'selected-trackers';

    /**
     * Read list of selected trackerId's from local storage
     */
    function loadStoredTrackers() {
      var selectedTrackers = Storage.get(storageKey);
      if(!selectedTrackers) {
        return;
      }
      console.info('Found ' + _.keys(selectedTrackers).length  + ' selected trackers in local storage.');
      _.each(selectedTrackers, function(trackerId) {
        var trackerData = {events: []};
        trackers[trackerId] = trackerData;
        // read tracker data
        TrackerService.getTracker(trackerId).then(function(tracker) {
          trackerData.tracker = tracker;
        });
      });
    }


    // TODO websocket protocol handling doesn't belong here
    function subscribeTrackers(ws) {
      if(_.isEmpty(trackers)) {
        console.info('No trackers to subscribe');
        return;
      }
      console.info('Subscribing ' + _.keys(trackers).length + ' trackers.');
      ws.send({
        subscribe: 'trackers',
        ids: _.keys(trackers)
      });
    }

    function initialize() {
      loadStoredTrackers();
      WebSocket.registerOnOpen(subscribeTrackers);

      if(!_.isEmpty(trackers)) {
        WebSocket.open();
      }
    }

    function storeTrackers() {
      Storage.set(storageKey, _.keys(trackers));
    }


    function addTracker(tracker) {
      console.debug('Selected tracker', tracker);
      TrackerService.subscribeTracker(tracker);
      var trackersData = {
        tracker: tracker,
        events: [],
      };
      trackers[tracker.id] = trackersData;
      storeTrackers();
    }
    function removeTracker(tracker) {
      TrackerService.unsubscribeTracker(tracker);
      delete trackers[tracker.id];
      storeTrackers();
    }
    function getTrackers() {
      return trackers;
    }
    function isSelected(tracker) {
      if(tracker.id) {
        return !! trackers[tracker.id];
      }
      return !! trackers[tracker];
    }

    // API
    self.initialize = initialize;
    self.isSelected = isSelected;
    self.addTracker = addTracker;
    self.removeTracker = removeTracker;
    self.getTrackers = getTrackers;
  });


  // Contains data for currently selected trackers
  // @ngInject
  module.service('SelectedSessions', function(TrackerService, WebSocket) {
    var self = this;
    var sessions = {};
    var newEventListeners = [];

    function receiveNewEvents(events) {
      _.each(events.events, function(event) {
        if(sessions[event.eventSessionId]) {
          sessions[event.eventSessionId].events.push(event);
        } else {
          sessions[event.eventSessionId] = {
            session: {id: event.eventSessionId},
            events: [event]
          };
          TrackerService.getSession(event.eventSessionId).then(function(sessionData) {
            sessions[event.eventSessionId].session = sessionData.sessions[0];
          });
        }
        _.each(newEventListeners, function(listener) {
          listener(event);
        });
        // TODO notify map to draw these
      });
    }

    function listenNewEvents(callback) {
      newEventListeners.push(callback);
    }

    function initialize() {
      WebSocket.registerMessageListener('events', receiveNewEvents);
    }

    function addSession(session) {
      console.log('selected session', session);

      var sessionData = {
        session: session,
        events: [],
      };
      sessions[session.id] = sessionData;
      TrackerService.listEvents(session).then(function(data) {
        console.info('fetched events for session ' + session.id + ' got ' + data.events.length + ' events');
        sessionData.events = sessionData.events.concat(data.events);
      });
    }
    function removeSession(session) {
      delete sessions[session.id];
    }
    function getSessions() {
      return sessions;
    }

    function isSelected(session) {
      if(session.id) {
        return !! sessions[session.id];
      }
      return !! sessions[session];
    }

    self.isSelected = isSelected;
    self.getSessions = getSessions;
    self.addSession = addSession;
    self.removeSession = removeSession;
    self.initialize = initialize;
    self.listenNewEvents = listenNewEvents;
  });

})();
