'use strict';

(function() {
  var module = require('./_index');

  // @ngInject
  module.service('WebSocket', function WebSocket(Config, $websocket, $timeout) {
    var self = this;
    var _ws;
    var _openListeners = [];
    var _messageListeners = {};

    /** callback($websocket) */
    function registerOnOpen(callback) {
      console.info('registerOnOpen');
      _openListeners.push(callback);
    }

    function registerMessageListener(type, callback) {
      if(!_messageListeners[type]) {
        _messageListeners[type] = [];
      }
      _messageListeners[type].push(callback);
    }

    function websocket() {
      if(_ws) {
        return _ws;
      }
      console.info('Initializing WebSocket');
      var ws = $websocket(Config.server.websocket);
      ws.onOpen(function(msg) {
        console.debug('websocket:open', msg);
        _.each(_openListeners, function(listener) {
          listener(ws);
        });
      });
      ws.onMessage(function(msg) {
        var parsed = JSON.parse(msg.data);
        parsed = walkTree(parsed, convertKey);
        console.debug('websocket:receive', msg.data);
        _.each(_.keys(_messageListeners), function(eventType) {
          if(parsed[eventType]) {
            _.each(_messageListeners[eventType], function(listener) {
              listener(parsed);
            });
          }
        });
      });
      ws.onClose(function(msg) {
        console.debug('websocket:close', msg);
        _ws = undefined;
        $timeout(websocket, 200);
      });
      _ws = ws;
      return _ws;
    }

    function send(message) {
      console.debug('WebSocket.send', message);
      websocket().send(message);
    }

    function open() {
      websocket();
    }

    // API
    self.send = send;
    self.registerOnOpen = registerOnOpen;
    self.registerMessageListener = registerMessageListener;
    self.open = open;
  });

})();
