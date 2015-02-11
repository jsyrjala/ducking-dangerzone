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
    })
    .state('login', {
      url: '/login',
      controller: 'LoginPageCtrl as loginPage',
      templateUrl:  'login/login-page.html',
      title: 'Login',
    })
    .state('register', {
      url: '/register',
      controller: 'RegisterPageCtrl as registerPage',
      templateUrl:  'register/register-page.html',
      title: 'Register a new account',
    })
    .state('trackers', {
      url: '/trackers',
      controller: 'TrackersPageCtrl as trackersPage',
      templateUrl:  'trackers/trackers-page.html',
      title: 'Trackers',
      resolve: {
        trackersData: ['TrackerService', function(TrackerService) {
          return TrackerService.listTrackers();
        },
      ]}
    })
    ;

    $urlRouterProvider.otherwise('/');

  }

  module.exports = Routes;
})();
