'use strict';

var gulp   = require('gulp');
var rev    = require('gulp-rev');
var config = require('../config');
var fs = require('fs');
var _ = require('lodash');

/**
 * Revision all asset files and
 * write a manifest file
 */
gulp.task('revision', function() {
  return gulp.src(config.revision.src.assets, { base: config.revision.src.base })
    .pipe(gulp.dest(config.revision.dest.assets))
    .pipe(rev())
    .pipe(gulp.dest(config.revision.dest.assets))
    .pipe(rev.manifest({ path: config.revision.dest.manifest.name }))
    .pipe(gulp.dest(config.revision.dest.manifest.path));
});

/**
 * Remove nonrevisioned assets
 */
gulp.task('revision:clean', function() {
  var manifest = 'build/manifest.json';
  var obj = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  fs.unlinkSync(manifest);
  _.each(obj, function(revisioned, original) {
    fs.unlinkSync('build/' + original);
  });
});
