'use strict';

(function() {
  var module = require('./_index');
  function AboutCtrl(AppSettings) {
    this.appTitle = AppSettings.appTitle;
  }
  module.controller('AboutCtrl', AboutCtrl);
})();
