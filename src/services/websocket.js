'use strict';

(function() {
  var module = require('./_index');

  module.service('WebSocket', function WebSocket(Config, $websocket, $timeout) {
    var self = this;
    var _ws;

    function websocket() {
      if(_ws) {
        return _ws;
      }
      console.info('Initializing WebSocket');
      var ws = $websocket(Config.server.websocket);
      ws.onMessage(function(msg) {
        var parsed = JSON.parse(msg.data);
        parsed = walkTree(parsed, convertKey);
        console.log('websocket:receive', parsed);
      });
      ws.onOpen(function(msg) {
        console.log('websocket:open', msg);
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

    self.websocket = websocket;
  });

})();
