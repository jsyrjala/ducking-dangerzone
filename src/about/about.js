'use strict';

(function() {
  var module = require('./_index');
  function AboutPageCtrl(Config) {
    this.appTitle = Config.appTitle;
  }
  module.controller('AboutPageCtrl', AboutPageCtrl);
})();
