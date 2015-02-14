'use strict';
// corner map menu
// TODO   move to leaflet-map-menu.js
(function() {
var L = require('leaflet');

L.Control.MapMenu = L.Control.extend({
  options: {
    position: 'topright',
    title: 'Map menu',
    //forceSeparateButton: false,
    //forcePseudoFullscreen: false
  },
  onAdd: function () {
    var className = 'leaflet-control-map-menu fa fa-arrow-left',
        container = L.DomUtil.create('div', 'leaflet-bar');
      this._createButton(this.options.title, className, container, this.openMapMenu, this);
      return container;
  },

  _createButton: function (title, className, container, fn, context) {
    var link = L.DomUtil.create('a', className, container);
    link.href = '#';
    link.title = title;

    L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', fn, context)
      .addListener(link, 'dblclick', L.DomEvent.stopPropagation)
      .addListener(link, 'dblclick', L.DomEvent.preventDefault)
      .addListener(link, 'dblclick', fn, context);

    L.DomEvent
      .addListener(container, 'dblclick', L.DomEvent.stopPropagation)
      .addListener(container, 'click', L.DomEvent.stopPropagation);
    return link;
  },

  openMapMenu: function openMapMenu() {
    console.log('openMapMenu');
    this.options.openMenuCallback();
  }
});

L.Map.addInitHook(function () {
  if (this.options.mapMenuControl) {
    this.mapMenuControl = L.control.mapMenu(this.options.mapMenuControlOptions);
    this.addControl(this.mapMenuControl);
  }
});
L.control.mapMenu = function (options) {
  return new L.Control.MapMenu(options);
};
})();
