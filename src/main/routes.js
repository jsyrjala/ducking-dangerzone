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
      controller: 'HomePageCtrl as homePage',
      templateUrl: 'home/home-page.html',
      title: 'Home',
    })
    .state('about', {
      url: '/about',
      controller: 'AboutPageCtrl as aboutPage',
      templateUrl:  'about/about-page.html',
      title: 'About',
    })
    .state('map', {
      url: '/map',
      controller: 'MapPageCtrl as mapPage',
      templateUrl:  'map/map-page.html',
      title: 'Map',
    });

    $urlRouterProvider.otherwise('/');

  }

  module.exports = Routes;
})();
