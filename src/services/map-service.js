'use strict';

(function() {
  var module = require('./_index');
  var angular = require('angular');
  var L = require('leaflet');

  function isTouchDevice() {
    return !!('ontouchstart' in window)  || // works on most browsers
    !!('onmsgesturechange' in window); // works on ie10
  }

  // @ngInject
  module.service('MapService', function MapService(Config, $timeout, $location, $rootScope) {
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

      return map;
    }

    /**
     * Attach jquery event handlers for map menu.
     * Angular wont work because old DOM tree (leaflet)
     * is reattached to DOM when user returns to map page.
     */
    function attachMenu () {
      var menuContent = angular.element('#menu-content');
      var menuOpen = false;

      function toggleMenu(e) {
        // prevent event bubbling to Leaflet map
        e.stopPropagation();
        menuOpen = !menuOpen;
        var operations = angular.element('#menu-content-open');
        if(menuOpen) {
          operations.removeClass('ng-hide');
        } else {
          operations.addClass('ng-hide');
        }
      }

      menuContent.click(toggleMenu);
      // add handler for double click, otherwise it triggers zoom in map.
      menuContent.dblclick(toggleMenu);

      // Loop over links, add click handler that changes
      // url via $location, which won't cause page load.
      // The new location is looked up from  <a href> attribute.
      var menuLinks = angular.element('#menu-content-open li');
      _.map(menuLinks, function(link) {
        var linkElem = angular.element(link);
        linkElem.click(function(e) {
          e.preventDefault();
          var href = linkElem.find('a').attr('href');
          $rootScope.$apply(function() {
            $location.path(href);
          });
        });
      });
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

        $timeout(attachMenu);
        return;
      }
      _mapComponent = createMapComponent(element);
      $timeout(attachMenu);
    };

    self.invalidateSize = function invalidateSize() {
      _mapComponent.invalidateSize();
    };
  });
})();
