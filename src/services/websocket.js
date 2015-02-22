'use strict';

(function() {
  var module = require('./_index');

  // @ngInject
  module.service('WebSocket', function WebSocket(Config, $websocket, $timeout) {
    var self = this;
    var _ws;
    var _openListeners = [];

    /** callback($websocket) */
    function registerOnOpen(callback) {
      console.info('registerOnOpen');
      _openListeners.push(callback);
    }

    function websocket() {
      if(_ws) {
        return _ws;
      }
      console.info('Initializing WebSocket');
      var ws = $websocket(Config.server.websocket);
      ws.onOpen(function(msg) {
        console.log('websocket:open', msg);
        _.each(_openListeners, function(listener) {
          listener(ws);
        });
      });
      ws.onMessage(function(msg) {
        var parsed = JSON.parse(msg.data);
        parsed = walkTree(parsed, convertKey);
        console.log('websocket:receive', parsed);
      });
      ws.onClose(function(msg) {
        console.log('websocket:close', msg);
        // TODO redo subscribtions
        _ws = undefined;
        $timeout(websocket, 200);
      });
      _ws = ws;
      return _ws;
    }

    function send(message) {
      console.log('WebSocket.send', message);
      websocket().send(message);
    }

    function open() {
      websocket();
    }

    // API
    self.send = send;
    self.registerOnOpen = registerOnOpen;
    self.open = open;
  });

})();
