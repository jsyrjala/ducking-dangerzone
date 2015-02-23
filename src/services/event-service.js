'use strict';

(function() {
  var module = require('./_index.js');
  window.CryptoJS = require('browserify-cryptojs');
  require('browserify-cryptojs/components/hmac');
  require('browserify-cryptojs/components/sha1');

  module.service('EventService', function EventService($http, Config) {
    var self = this;
    function generateMAC(message, sharedSecret) {
      var keys = [];
      _.each(_.keys(message), function(key) {
          keys.push(key);
      });
      keys.sort();
      var base = '';
      for(var i = 0; i < keys.length; i ++) {
          var key = keys[i];
          base += key + ':' + message[key] + '|';
      }
      var hash = window.CryptoJS.HmacSHA1(base, sharedSecret);
      return hash.toString(window.CryptoJS.enc.Hex);
    }

    function generateMessage(trackerCode, sharedSecret, event, session) {
      var timestamp = event.timestamp || new Date();
      var eventMsg = {
          version: 1,
          tracker_code: trackerCode,
          time: timestamp.toISOString(),
          session_code: session,
      };
      if(event.location) {
        eventMsg.latitude = event.location.lat;
        eventMsg.longitude = event.location.lng;
      }
      eventMsg = _.pick(_.merge(eventMsg, _.pick(event, ['accuracy', 'altitude', 'altitudeAccuracy', 'speed', 'heading'])), _.identity);
      eventMsg.mac = generateMAC(eventMsg, sharedSecret);
      return eventMsg;
    }

    function sendEvent(trackerCode, sharedSecret, event, session) {
      var message = generateMessage(trackerCode, sharedSecret, event, session);
      // CORS set credentials?
      return $http.post(Config.server.url + '/events', message);
    }

    // API
    self.sendEvent = sendEvent;
  });

})();
