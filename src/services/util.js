'use strict';

(function() {
  var Moment = require('moment');
  var module = require('./_index.js');
  /**
    * @ngInject
    */
  module.service('Time', function Time() {
    var self = this;
    function date() {
      return new Date();
    }
    function moment() {
      return new Moment();
    }
    function timestamp() {
      return new Date().getTime();
    }

    // API
    /** current time as Date object */
    self.date = date;
    /** current time as moment object */
    self.moment = moment;
    /** current time as unix timestamp object, milliseconds */
    self.timestamp = timestamp;
  });
})();
