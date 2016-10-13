const electron = require('electron');

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const {session} = require('electron');

let defaultWindowOpts = require('electron-browser-window-options')

let javascript_src = javascript_trg = null;

let mainWindow, pro_send = null;


/**/
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    closureCompiler = require('gulp-closure-compiler'),
    cleanCSS = require('gulp-clean-css'),
    stripDebug = require('gulp-strip-debug'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');


/**/


var myOpts = Object.assign({}, defaultWindowOpts, {
  minWidth: 700,
  minHeight: 500,
  maxWidth: 700,
  maxHeight: 500,
  resizable: false,
  backgroundColor: '#fff'
})



function createWindow () {
  mainWindow = new BrowserWindow(myOpts)
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  });

  //clear session
  const ses = session.fromPartition('persist:name');
  ses.clearStorageData();
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('javascript-src-dialog', function (event) {
  dialog.showOpenDialog(mainWindow, {
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
  dialog.showOpenDialog(mainWindow, {
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

ipc.on('proccess', function (event) {
    console.log("Proccess START");
    gulp.start('build-js');
    //event.sender.send('prossess-after', javascript_src, javascript_trg);

    pro_send = event.sender

});


/***************************************************/


gulp.task('build-js', function () {
    //, '!Scripts/**/jquery-ui.js'
    return gulp.src([javascript_src + '/**/*.js'])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest(javascript_trg)).on('end', function(){

          pro_send.send('prossess-after', javascript_src, javascript_trg);
        })

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



