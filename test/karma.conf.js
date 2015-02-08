'use strict';

module.exports = function(config) {

  config.set({

    basePath: '../',
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'src/**/*.js': ['browserify']
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    reporters: ['progress'],

    autoWatch: true,

    plugins: [
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-bro',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],

    proxies: {
      '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
      // 3rd-party resources
      'node_modules/angular-mocks/angular-mocks.js',

      // app-specific code
      'src/ruuvi.js',

      // test files
      'test/unit/**/*.js'
    ]

  });

};
