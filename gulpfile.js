'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

gulp.task('js', function() {
  return browserify({entries: ['./src/index.js']})
    .transform('babelify', {presets: ['es2015', 'stage-0']})
    .bundle()
    .pipe(source('./index.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('tests', function() {
  return browserify({entries: ['./tests/index.js']})
    .transform('babelify', {presets: ['es2015', 'stage-0']})
    .bundle()
    .pipe(source('./tests/tests.build.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch:js', function() {
  return gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('watch:tests', function() {
  return gulp.watch(['./tests/**/*-tests.js', '!./tests/tests.build.js'], ['tests']);
});

gulp.task('watch', ['watch:js', 'watch:tests']);

gulp.task('compile', ['js']);
