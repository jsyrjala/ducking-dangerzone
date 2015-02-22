'use strict';
(function() {
  var module = require('./_index');
  var L = require('leaflet');
  // http://gamedev.stackexchange.com/questions/46463/is-there-an-optimum-set-of-colors-for-10-players
  var colors = ['#ff8080',
                '#78bef0',
                '#ded16f',
                '#cc66c9',
                '#5dbaac',
                '#f2a279',
                '#7182e3',
                '#92d169',
                '#bf607c',
                '#7cddf7',
                ];


  function MapDraw(SelectedSessions) {
    var self = this;

    function lineOpts(session) {
      console.log('session', session.id, session);
      return {
        color: colors[session.id % colors.length] || 'red',
        opacity: 0.8,
      };
    }

    function drawNewEvent(map, event) {
      var sessionData = SelectedSessions.getSessions()[event.eventSessionId];
      var point = L.latLng(event.location.latitude, event.location.longitude);
      if(sessionData.line) {
        sessionData.line.addLatLng(point);
      } else {
        sessionData.line = L.polyline(point, lineOpts(sessionData.session)).addTo(map);
      }
      // TODO update or create marker
    }

    function drawSessions(map) {
      _.each(SelectedSessions.getSessions(), function(sessionData) {
        var points = _.chain(sessionData.events).filter(function(event) {
          return event.location;
        }).map(function(event) {
          return [event.location.latitude, event.location.longitude];
        }).value();

        sessionData.line = L.polyline(points, lineOpts(sessionData.session)).addTo(map);
      });
      SelectedSessions.listenNewEvents(function(event) {
        drawNewEvent(map, event)
      })
    }

    // API
    self.drawSessions = drawSessions;
  }
  // @ngInject
  module.service('MapDraw', MapDraw);
})();
