'use strict';

(function() {
   /**
   * @ngInject
   */
  function OnRun($rootScope, Config, SelectedTrackers, SelectedSessions) {

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $rootScope.pageTitle = '';
      if ( toState.title ) {
        $rootScope.pageTitle += toState.title;
        $rootScope.pageTitle += ' \u2014 ';
      }
      $rootScope.pageTitle += Config.appTitle;
    });

    // https://github.com/ftlabs/fastclick
    var attachFastClick = require('fastclick');
    attachFastClick(document.body);

    SelectedTrackers.initialize();
    SelectedSessions.initialize();
  }

  module.exports = OnRun;
})();
