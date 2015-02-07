'use strict';


 (function() {
   /**
   * @ngInject
   */
  function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
    .state('home', {
      url: '/',
      controller: 'ExampleCtrl as home',
      templateUrl: 'home/home.html',
      title: 'Home'
    });

    $urlRouterProvider.otherwise('/');

  }

  module.exports = Routes;
})();
