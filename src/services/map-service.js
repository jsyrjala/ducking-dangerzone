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

    function get() {
      return _location;
    }

    function set(location) {
      _location = location;
      $rootScope.$emit(_eventKey, location);
      return location;
    }

    function listen(callback) {
      $rootScope.$on(_eventKey, callback);
    }

    // API
    self.get = get;
    self.set = set;
    self.listen = listen;
  });

  // @ngInject
  module.service('MapService', function MapService(Config, $timeout, $location, $rootScope, CurrentLocation, Storage, Time) {
    var _mapStateKey = 'map-state';
    var self = this;
    var _mapComponent,
        _markers;

    function reset() {
      _markers = {};
    }
    reset();

    function updateMarker(marker, newLocation, options) {
      if(!newLocation) {
        return marker;
      }
      if(!marker) {
        var newMarker = new L.Marker(newLocation, options);
        newMarker.addTo(_mapComponent);
        return newMarker;
      }
      marker.setLatLng(newLocation);
      marker.update();
      return marker;
    }


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

    function storeMapState(event) {
        var zoom = _mapComponent.getZoom();
        var location = _mapComponent.getCenter();
        var data = Storage.get(_mapStateKey, {});
        if(event.layer && event.layer.options.title) {
            data.tiles = event.layer.options.title;
        }
        data.zoom = zoom;
        data.lat = location.lat;
        data.lng = location.lng;
        data.timestamp = Time.timestamp();
        Storage.set(_mapStateKey, data);
    }

    function showMenu() {
      $('#map-menu-container').removeClass('ng-hide');
      $('a.leaflet-control-map-menu').addClass('fa-rotate-180');
    }

    function hideMenu() {
      $('#map-menu-container').addClass('ng-hide');
      $('a.leaflet-control-map-menu').removeClass('fa-rotate-180');
    }

    function getMapDefaults() {
      var zoom = Config.map.defaultZoom;

      var mapState = Storage.get(_mapStateKey);
      var location = Config.map.defaultLocation;
      if(mapState) {
          location = L.latLng(mapState.lat, mapState.lng);
          zoom = mapState.zoom || zoom;
      }

      var selectedLayerName = Config.map.defaultLayer;
      var selectedLayer = _.find(layers, function(layer) {
        return layer.options.title === selectedLayerName;
      }) || layers[0];

      return {
        defaults: {
          tileLayer: selectedLayer.url,
          maxZoom: 19,
          zoomControl: false,
        },
        center: {
          lat: location.lat,
          lng: location.lng,
          zoom: zoom,
        },
      };
    }

    function registerMap(map) {
      _mapComponent = map;
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
      /*
      L.control.fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
        title: 'Fullscreen', // change the title of the button, default Full Screen
        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
        forcePseudoFullscreen: false // force use of pseudo full screen even if full screen API is available, default false
      }).addTo(map);
      */
      L.control.mapMenu({
        openMenuCallback: function() {
          var container = $('#map-menu-container');
          if(container.hasClass('ng-hide')) {
            showMenu();
          } else {
            hideMenu();
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

      map.on('zoomend', storeMapState);
      map.on('moveend', storeMapState);
      map.on('layeradd', storeMapState);

      var opts = {
        timeout: 10000,
        maximumAge: 10000,
        enableHighAccuracy: true,
        watch: true
      };
      map.locate(opts);

      var selfMarkerOpts = {
        icon: new L.Icon(
          {
            iconUrl: 'images/pin-cross.png',
            iconSize: [20, 25],
            iconAnchor: [10, 25],
            popupAnchor: [-3, -76],
            className: 'self-location'
          })
      };
      CurrentLocation.listen(function(event, location) {
        _markers.selfMarker = updateMarker(_markers.selfMarker, location, selfMarkerOpts);
      });

      _markers.selfMarker = updateMarker(_markers.selfMarker, CurrentLocation.get(), selfMarkerOpts);

      return map;
    }

    function invalidateSize() {
      _mapComponent.invalidateSize();
    }

    function center(location, zoom) {
      if(location) {
        _mapComponent.setView(location, zoom);
      }
    }

    // API
    self.reset = reset;
    self.center = center;
    self.invalidateSize = invalidateSize;
    self.getMapDefaults = getMapDefaults;
    self.registerMap = registerMap;
  });

})();
