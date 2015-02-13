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

  'revision': {
    'src': {
      'assets': [
        'build/css/*.css',
        'build/**/*.js',
        'build/images/**/*'
      ],
      'base': 'build/'
    },
    'dest': {
      'assets': 'build/',
      'manifest': {
        'name': 'manifest.json',
        'path': 'build/'
      }
    }
  },

  'collect': {
    'src': [
      'build/manifest.json',
      'build/**/*.{html,xml,txt,json,css,js}',
      '!build/feed.xml'
    ],
    'dest': 'build/'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js}',
    'dest': 'build/',
    'options': {}
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
