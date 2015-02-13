'use strict';

var gulp   = require('gulp');
var rev    = require('gulp-rev');
var config = require('../config');

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
