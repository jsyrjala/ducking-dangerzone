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
      templateUrl: 'home/home-page.html',
      title: 'Home',
    })
    .state('about', {
      url: '/about',
      controller: 'AboutCtrl as about',
      templateUrl:  'about/about-page.html',
      title: 'About',
    });

    $urlRouterProvider.otherwise('/');

  }

  module.exports = Routes;
})();
