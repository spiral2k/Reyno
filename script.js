var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    closureCompiler = require('gulp-closure-compiler'),
    cleanCSS = require('gulp-clean-css'),
    stripDebug = require('gulp-strip-debug'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');


gulp.task('default', ['build-js', 'minify-css', 'minify-images']);

gulp.task('build-js', function () {
    //, '!Scripts/**/jquery-ui.js'
    return gulp.src(['Scripts/**/*.js'])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest("prodFiles/js"));
});

gulp.task('minify-css', function () {
    return gulp.src('Styles/**/*.css')
      .pipe(cleanCSS({
            compatibility: '*',
            keepSpecialComments:0
        }))
      .pipe(rename(function (path) {
          path.extname = ".css";
      }))
      .pipe(gulp.dest('prodFiles/css'));
});

gulp.task('minify-images', function() {
    gulp.src('pics/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('prodFiles/images'));
});

