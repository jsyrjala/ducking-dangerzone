'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'app/**/*.js',
    'dest': 'build/'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/**/*.html'
    ],
    'src': 'app/**/*.html',
    'dest': 'app/js'
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/ruuvi.js'],
    'bundleName': 'ruuvi.js'
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
