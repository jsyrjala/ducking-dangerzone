'use strict';

(function() {
  var module = require('./_index');
  var L = require('leaflet');

  function isTouchDevice() {
    return !!('ontouchstart' in window)  || // works on most browsers
    !!('onmsgesturechange' in window); // works on ie10
  }

  // @ngInject
  module.service('MapService', function MapService(Config) {
    var self = this;

    function tileLayers() {
      var leafletTiles = _.filter(Config.map.mapTiles, function(tile) {
        return tile.type === 'leaflet';
      });
      return _.map(leafletTiles, function(tile) {
        var opts = {
          title: tile.title,
          attribution: tile.attribution,
          maxZoom: tile.maxZoom,
          minZoom: tile.minZoom || 0};
          return new L.TileLayer(tile.url, opts);
        });
    }
    var layers = tileLayers();

    /**
     * Create a new Leaflet map component.
     */
    self.createMapComponent = function createMapComponent(element) {
      var zoom = Config.map.defaultZoom;
      var location = Config.map.defaultLocation;

      var map = L.map(element, {
        zoomControl: false,
      }).setView(location, zoom);

      // setup layers
      var selectedLayerName = Config.map.defaultLayer;
      var selectedLayer = _.find(layers, function(layer) {
        return layer.options.title === selectedLayerName;
      });
      map.addLayer(selectedLayer || layers[0]);

      var baseMaps = {};
      _.each(layers, function(layer) {
        baseMaps[layer.options.title] = layer;
      });
      // add layer selection control
      L.control.layers(baseMaps).addTo(map);

      // disable zoom for touch devices
      if(!isTouchDevice()) {
        L.control.zoom().addTo(map);
      }

      // add full screen button
      L.control.fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
        title: 'Fullscreen', // change the title of the button, default Full Screen
        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
        forcePseudoFullscreen: false // force use of pseudo full screen even if full screen API is available, default false
      }).addTo(map);

      // events are fired when entering or exiting fullscreen.
      map.on('enterFullscreen', function(){
        console.log('entered fullscreen');
      });

      map.on('exitFullscreen', function(){
        console.log('exited fullscreen');
      });
    };

    self.openMap = function openMapComponent(element) {
      return self.createMapComponent(element);
    };

  });
})();
