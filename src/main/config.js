'use strict';

(function() {
  var L = require('leaflet');

  var Config = {
    appTitle: 'RuuviTracker Explorer',
    apiUrl: '/api/v1',
    server: {
      url: 'http://dev-server.ruuvitracker.fi/api/v1-dev/',
    },
    map: {
      defaultLocation: new L.LatLng(60.168564, 24.941111),
      defaultZoom: 13,
      defaultLayer: 'OpenStreetMap',
      mapTiles: [
        {
          title: 'MML Perus',
          type: 'leaflet',
          url: 'http://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.jpg',
          attribution: 'Maanmittauslaitos',
          maxZoom: 18
        },
        {
          title: 'MML Orto',
          type: 'leaflet',
          url: 'http://tiles.kartat.kapsi.fi/ortokuva/{z}/{x}/{y}.jpg',
          attribution: 'Maanmittauslaitos',
          maxZoom: 18,
          minZoom: 13,
        },
        {
          title: 'MML Tausta',
          type: 'leaflet',
          url: 'http://tiles.kartat.kapsi.fi/taustakartta/{z}/{x}/{y}.jpg',
          attribution: 'Maanmittauslaitos',
          maxZoom: 18
        },
        {
          title: 'OpenStreetMap',
          type: 'leaflet',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          maxZoom: 18,
        },
        /*
        {
          title: 'Google Roadmap',
          type: 'google',
          // Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
          mapType: 'ROADMAP',
          attribution: 'Google Maps',
          maxZoom: 18,
        },
        {
          title: 'Google Satellite',
          type: 'google',
          // Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
          mapType: 'SATELLITE',
          attribution: 'Google Maps',
          maxZoom: 18,
        },
        {
          title: 'Google Hybrid',
          type: 'google',
          mapType: 'HYBRID',
          attribution: 'Google Maps',
          maxZoom: 18,
        },
        {
          title: 'Google Terrain',
          type: 'google',
          mapType: 'TERRAIN',
          attribution: 'Google Maps',
          maxZoom: 18,
        },

        {
          title: 'Bing Aerial',
          type: 'bing',
          mapType: 'Aerial',
          apiKey: 'AmubWuAsFPazPiBi8bT0BlpJNpvTJJ3bIp16jjZiEtcKEX11CMKDgtu1VKaJqxZL',
          maxZoom: 18,
        },
        {
          title: 'Bing Aerial labels',
          type: 'bing',
          mapType: 'AerialWithLabels',
          apiKey: 'AmubWuAsFPazPiBi8bT0BlpJNpvTJJ3bIp16jjZiEtcKEX11CMKDgtu1VKaJqxZL',
          maxZoom: 18,
        },
        {
          title: 'Bing Road',
          type: 'bing',
          mapType: 'Road',
          apiKey: 'AmubWuAsFPazPiBi8bT0BlpJNpvTJJ3bIp16jjZiEtcKEX11CMKDgtu1VKaJqxZL',
          maxZoom: 18,
        },
        */
      ],

    },
  };

  module.exports = Config;
})();
