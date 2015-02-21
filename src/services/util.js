'use strict';

(function() {
  var moment = require('moment');
  window.convertKey = function convertKey(origObject, key) {
    var value = origObject[key];
    if(_.contains(['id', 'event_session_id', 'tracker_id'], key)) {
      origObject[key] = parseInt(value);
    }
    if(_.contains(['event_time', 'store_time', 'created_on', 'latest_activity'], key)) {
      origObject[key] = moment(value).toDate();
    }
    var newKey = key;
    if (newKey.indexOf('_') !== -1) {
      newKey = _.camelCase(newKey);
      origObject[newKey] = origObject[key];
      delete origObject[key];
    }
  };
  window.walkTree = function walkTree(origObject, processFn) {
    for (var key in origObject) {
      if (typeof origObject[key] !== 'undefined') {
        if (typeof origObject[key] === 'object' && !(origObject[key] instanceof Array)) {
          walkTree(origObject[key], processFn);
        }
        if (origObject[key] instanceof Array) {
          for (var i = 0; i < origObject[key].length; i++) {
            walkTree(origObject[key][i], processFn);
          }
        }
        processFn(origObject, key);
      }
    }
    return origObject;
  };

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
