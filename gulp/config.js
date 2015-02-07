'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'src/styles/**/*.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'src/**/*.js',
    'dest': 'build/'
  },

  'images': {
    'src' : 'src/images/**/*',
    'dest': 'build/images'
  },

  'views': {
    'watch': [
      'src/index.html',
      'src/**/*.html'
    ],
    'src': 'src/**/*.html',
    'dest': 'src/js'
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./src/ruuvi.js'],
    'bundleName': 'ruuvi.js'
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
