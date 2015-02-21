'use strict';
(function() {
  var module = require('./_index');
  var L = require('leaflet');

  function MapDraw(SelectedSessions) {
    var self = this;
    function drawSessions(map) {
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


      _.each(SelectedSessions.getSessions(), function(sessionData) {
        var points = _.chain(sessionData.events).filter(function(event) {
          return event.location;
        }).map(function(event) {
          return [event.location.latitude, event.location.longitude];
        }).value();

        var polylineOptions = {
          // TODO parseInt in preProces
          color: colors[parseInt(sessionData.session.id) % colors.length] || 'red',
          opacity: 0.8,
        };
        L.polyline(points, polylineOptions).addTo(map);
      });
    }
    self.drawSessions = drawSessions;
  }
  // @ngInject
  module.service('MapDraw', MapDraw);
})();
