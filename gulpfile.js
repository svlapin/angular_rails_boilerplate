'use strict';

var gulp = require('gulp');
var gulpLess = require('gulp-less');
var gulpConcat = require('gulp-concat');
var gulpInject = require('gulp-inject');
var gulpUglify = require('gulp-uglify');

var distPath = function() {
  return './public/dist';
};

gulp.task('less', function() {
  return gulp.src(['ui/components/bootstrap-less/less/bootstrap.less',
    'ui/assets/less/**/*.less'])
    .pipe(gulpConcat('style.less'))
    .pipe(gulpLess())
    .pipe(gulp.dest(distPath() + '/css'));
});

gulp.task('js-libs-dev', function() {
  return gulp.src(['ui/components/angular/angular.js'])
    .pipe(gulpConcat('libs.js'))
    .pipe(gulp.dest(distPath() + '/js'));
});

gulp.task('index', function() {
  var target = gulp.src('ui/index.html');

  var jsStream = gulp.src(['ui/ng/app.module.js']);

  if (process.env.NODE_ENV === 'production') {
    jsStream = jsStream
      .pipe(gulpConcat('app.js'))
      .pipe(gulpUglify());
  }

  jsStream.pipe(gulp.dest(distPath() + '/js'));

  target
    .pipe(gulpInject(jsStream, {ignorePath: 'public'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['html', 'less'], function() {});

gulp.task('watch', ['index', 'less', 'js-libs-dev'], function() {
  gulp.watch('ui/assets/less/**/*.less', ['less']);
  gulp.watch('ui/index.html', ['index']);
});
