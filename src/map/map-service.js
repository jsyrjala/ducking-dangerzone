'use strict';

(function() {
  var module = require('./_index');
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
    var _locationData;
    var _eventKey = 'location:change';
    var self = this;

    function get() {
      return _locationData;
    }

    function set(locationData) {
      _locationData = locationData;
      $rootScope.$emit(_eventKey, locationData);
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
  module.service('MapService', function MapService(Config, $timeout, $location, $rootScope,
      CurrentLocation, Storage, Time, EventService) {
    var _mapStateKey = 'map-state';
    var self = this;
    var _alreadyLocating = false;
    var _mapComponent,
        _markers,
        _tracking = false;
    function reset() {
      _markers = {};
    }
    reset();

    // TODO move to map-draw.js
    function updateMarker(markerData, options, newLocation, accuracy) {
      if(!newLocation) {
        return selfMarkerOpts;
      }
      function createCircle(location, accuracy) {
        // TODO colors
        return L.circle(newLocation, accuracy);
      }

      if(!markerData) {
        var newMarker = new L.Marker(newLocation, options);
        newMarker.addTo(_mapComponent);
        var content = 'My location';
        var popupOpts = {
          className: 'self-marker-popup',
        };
        var markerPopup = L.popup(popupOpts).setContent(content);
        markerPopup.markerType = 'self-marker';

        newMarker.bindPopup(markerPopup);
        var circle = createCircle(newLocation, accuracy);
        _mapComponent.addLayer(circle);
        return {marker: newMarker, circle: circle};
      }
      markerData.marker.setLatLng(newLocation);
      markerData.marker.update();

      if(markerData.circle) {
        _mapComponent.removeLayer(markerData.circle);
        markerData.circle = undefined;
      }
      if(accuracy) {
        markerData.circle = createCircle(newLocation, accuracy);
        _mapComponent.addLayer(markerData.circle);
      }

      return markerData;
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
          maxZoom: selectedLayer.maxZoom,
          minZoom: selectedLayer.minZoom || 1,
          zoomControl: false,
        },
        center: {
          lat: location.lat,
          lng: location.lng,
          zoom: zoom,
        },
      };
    }

    var selfMarkerOpts = {
      icon: new L.Icon(
        {
          iconUrl: 'images/pin-cross.png',
          iconSize: [20, 25],
          iconAnchor: [10, 25],
          popupAnchor: [0, -30],
          className: 'self-marker'
        })
    };
    function startLocating(map) {
      if(_alreadyLocating) {
        return;
      }
      _alreadyLocating = true;

      function updateSelfMarkerPopup(event) {
        if(event.popup.markerType !== 'self-marker') {
          return;
        }
        var latLng = event.popup.getLatLng();
        var location = parseFloat(latLng.lat).toFixed(5) + ', ' + parseFloat(latLng.lng).toFixed(5);
        event.popup.setContent('<strong>My location</strong><br />' + location);
      }
      map.on('popupopen', updateSelfMarkerPopup);

      // TODO use raw geolocation api, locating should be on all the time
      // also when map is not displayed
      map.on('locationfound', function(event) {
        console.info('location found', event);
        CurrentLocation.set({
          location: event.latlng,
          accuracy: event.accuracy,
          altitude: event.altitude,
          altitudeAccuracy: event.altitudeAccuracy,
          heading: event.altitudeAccuracy,
          speed: event.speed,
          timestamp: new Date(event.timestamp),
        });
      });
      map.on('locationerror', function(event) {
        console.info('location error', event);
      });

      var opts = {
        timeout: 10000,
        maximumAge: 10000,
        enableHighAccuracy: true,
        watch: true
      };
      map.locate(opts);

      CurrentLocation.listen(function(event, locationData) {
        _markers.selfMarker = updateMarker(_markers.selfMarker, selfMarkerOpts, locationData.location, locationData.accuracy);
      });

      var session = new Date().toISOString();

      CurrentLocation.listen(function(event, locationData) {
        // TODO check sending flag
        var trackerCode = 'foobar';
        var sharedSecret = 'foobar';
        if(_tracking) {
          EventService.sendEvent(trackerCode, sharedSecret, locationData, session);
        }
      });
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
      map.on('zoomend', storeMapState);
      map.on('moveend', storeMapState);
      map.on('layeradd', storeMapState);

      startLocating(map);
      var locationData = CurrentLocation.get();
      if(locationData) {
        _markers.selfMarker = updateMarker(_markers.selfMarker, selfMarkerOpts, locationData.location, locationData.accuracy);
      }
      return map;
    }

    function invalidateSize() {
      _mapComponent.invalidateSize();
    }

    function center(locationData, zoom) {
      if(locationData) {
        if(locationData.location) {
          _mapComponent.setView(locationData.location, zoom);
        } else {
          _mapComponent.setView(location, zoom);
        }
      }
    }

    function listenTracking(callback) {
      callback(_tracking);
      $rootScope.$on('tracking:enabled', function(event, enabled){
        callback(enabled);
      });
    }

    function tracking(enabled) {
      _tracking = enabled;
      $rootScope.$emit('tracking:enabled', enabled);
    }

    // API
    self.reset = reset;
    self.center = center;
    self.invalidateSize = invalidateSize;
    self.getMapDefaults = getMapDefaults;
    self.registerMap = registerMap;
    self.listenTracking = listenTracking;
    self.tracking = tracking;
  });

})();
