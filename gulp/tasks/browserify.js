'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');

var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var ngAnnotate   = require('browserify-ngannotate');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {
  var bundler = browserify({
    entries: config.browserify.entries,
    noParse: ['lodash', 'angular-resource', 'angular-animate', 'angular-messages', 'angular-ui-router',
              'leaflet', 'angular-leaflet-directive', 'jquery', 'fastclick'],
    cache: {},
    packageCache: {},
    insertGlobals: true,
    fullPaths: !global.isProd,
    debug: global.isProd,
  });


  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  bundler.transform(ngAnnotate);
  bundler.transform('brfs');

  function rebundle() {
    var stream = bundler.bundle();

    gutil.log('Rebundle...');
    var sourcemap = global.isProd && config.browserify.sourcemap;
    return stream.on('error', handleErrors)
      .pipe(source(file))
      // sourcemap
      .pipe(gulpif(sourcemap, buffer()))
      .pipe(gulpif(sourcemap, sourcemaps.init()))
      .pipe(gulpif(global.isProd, streamify(uglify())))
      .pipe(gulpif(sourcemap, sourcemaps.write('./')))
      // sourceamp ends
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(browserSync.reload({ stream: true, once: true }));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('ruuvi.js');

});
