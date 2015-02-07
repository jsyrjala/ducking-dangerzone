'use strict';

(function() {
   /**
   * @ngInject
   */
  function OnRun($rootScope, Config) {

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      $rootScope.pageTitle = '';

      if ( toState.title ) {
        $rootScope.pageTitle += toState.title;
        $rootScope.pageTitle += ' \u2014 ';
      }

      $rootScope.pageTitle += Config.appTitle;
    });

  }

  module.exports = OnRun;
})();
