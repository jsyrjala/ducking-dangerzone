'use strict';

(function() {
  var module = require('./_index');

  /** @ngInject */
  module.service('Storage', function() {
    var self = this;
    function set(key, value) {
      if(!window.localStorage) {
        console.error('localStorage not supported.');
        return;
      }
      localStorage.setItem(key, JSON.stringify(value));
    }

    function get(key, defaultValue) {
      if(!window.localStorage) {
        console.error('localStorage not supported.');
        return;
      }
      var value = localStorage.getItem(key);
      if(!value) {
        return defaultValue;
      }
      try {
        return JSON.parse(value);
      } catch(e) {
        return defaultValue;
      }
    }

    function remove(key) {
      if(!window.localStorage) {
        console.error('localStorage not supported.');
        return;
      }
      localStorage.removeItem(key);
    }

    self.set = set;
    self.get = get;
    self.remove = remove;
  });

})();
