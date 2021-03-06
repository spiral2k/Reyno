const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

/**/
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    closureCompiler = require('gulp-closure-compiler'),
    stripDebug = require('gulp-strip-debug'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');
/**/


let javascript_src = null,
    javascript_trg = null,
    pro_send = null;


ipc.on('javascript-src-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory', 'openFile'],
    filters: [
    {name: 'Javascript', extensions: ['js']}
  ]
  }, function (files) {
    if (files){
      javascript_src = files[0];
      event.sender.send('javascript-src-dir-action', files);
    }
  });
});

ipc.on('javascript-trg-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory', 'openFile'],
    filters: [
    {name: 'Javascript', extensions: ['js']}
  ]
  }, function (files) {
    if (files){ 
      javascript_trg = files[0];
      event.sender.send('javascript-trg-dir-action', files);
    }
  });
});

ipc.on('build-js-ipc', function (event) {
    gulp.start('build-js');
    pro_send = event.sender;
});

/***************************************************/

gulp.task('build-js', function () {
    return gulp.src([javascript_src + '/**/*.js'])
        .pipe(babel({
            presets: ['babel-preset-es2015'].map(require.resolve)
        }))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest(javascript_trg)).on('end', function(){
          pro_send.send('after-build', javascript_src, javascript_trg)
        })
});
