'use strict';

var gulp = require('gulp');
var gulpLess = require('gulp-less');
var gulpConcat = require('gulp-concat');

var distPath = function() {
  return './public/dist';
};

gulp.task('html', function() {
  // copy index.html to public
  gulp.src('ui/index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('less', function() {
  return gulp.src(['ui/components/bootstrap-less/less/bootstrap.less',
    'ui/assets/less/**/*.less'])
    .pipe(gulpConcat('style.less'))
    .pipe(gulpLess())
    .pipe(gulp.dest(distPath() + '/css'));
});

gulp.task('build', ['html', 'less'], function() {});

gulp.task('watch', ['html', 'less'], function() {
  gulp.watch('ui/assets/less/**/*.less', ['less']);
  gulp.watch('ui/index.html', ['html']);
});
