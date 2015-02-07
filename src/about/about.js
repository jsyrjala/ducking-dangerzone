'use strict';

(function() {
  var module = require('./_index');
  function AboutPageCtrl(AppSettings) {
    this.appTitle = AppSettings.appTitle;
  }
  module.controller('AboutPageCtrl', AboutPageCtrl);
})();
