'use strict';

(function() {
  var module = require('./_index');
  var angular = require('angular');
  var L = require('leaflet');
  require('./leaflet-map-menu');

  function isTouchDevice() {
    return !!('ontouchstart' in window)  || // works on most browsers
    !!('onmsgesturechange' in window); // works on ie10
  }

  /**
   * Users current location
   * @ngInject
   */
  module.service('CurrentLocation', function($rootScope) {
    var _location;
    var _eventKey = 'location:change';
    var self = this;
    self.get = function get() {
      return _location;
    };
    self.set = function set(location) {
      self._location = location;
      $rootScope.$emit(_eventKey, location);
      return location;
    };

    self.listen = function listen(callback) {
      $rootScope.$on(_eventKey, callback);
    };
  });

  // @ngInject
  module.service('MapService', function MapService(Config, $timeout, $location, $rootScope, CurrentLocation) {
    var self = this;
    var _mapComponent;

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
    function createMapComponent(element) {
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

      L.control.mapMenu({
        openMenuCallback: function() {
          var container = $('#map-menu-container');
          if(container.hasClass('ng-hide')) {
            $('#map-menu-container').removeClass('ng-hide');
            $('a.leaflet-control-map-menu').addClass('fa-rotate-180');
          } else {
            $('#map-menu-container').addClass('ng-hide');
            $('a.leaflet-control-map-menu').removeClass('fa-rotate-180');
          }
        },
      }).addTo(map);
      // events are fired when entering or exiting fullscreen.
      map.on('enterFullscreen', function(){
        console.log('entered fullscreen');
      });

      map.on('exitFullscreen', function(){
        console.log('exited fullscreen');
      });

      map.on('locationfound', function(event) {
        console.info('location found', event);
        CurrentLocation.set(event.latlng);
      });
      map.on('locationerror', function(event) {
        console.info('location error', event);
      });

      CurrentLocation.listen(function(event, location) {
        console.log('listen', location);
        map.setView(location);
      });

      return map;
    }

    /** attach existing map component to fresh page */
    var redisplayMapComponent = function(element) {
        var oldContainer = _mapComponent.getContainer();
        var newContainer = angular.element(element);
        newContainer.replaceWith(oldContainer);

        _mapComponent.invalidateSize(false);
        /*
        if(deferredCenter) {
            mapView.setView(deferredCenter.location, deferredCenter.zoom);
            deferredCenter = null;
        }*/
    };

    self.openMap = function openMapComponent(element) {
      if(_mapComponent) {
        redisplayMapComponent(element);
        return;
      }
      _mapComponent = createMapComponent(element);

      self.startLocating();
    };

    self.startLocating = function startLocating() {
      var opts = {
        timeout: 10000,
        maximumAge: 10000,
        enableHighAccuracy: true,
        watch: true
      };
      _mapComponent.locate(opts);
    };

    self.invalidateSize = function invalidateSize() {
      _mapComponent.invalidateSize();
    };
  });

})();
