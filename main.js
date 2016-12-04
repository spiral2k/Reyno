const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { session } = require('electron');
let mainWindow;
require('./service/javascript');

let defaultWindowOpts = require('electron-browser-window-options');
var myOpts = Object.assign({}, defaultWindowOpts, {
  // minWidth: 700,
  // minHeight: 500,
  // maxWidth: 700,
  // maxHeight: 500,
  // resizable: false,
  backgroundColor: '#fff'
})



function createWindow () {
  mainWindow = new BrowserWindow(myOpts)
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
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



// gulp.task('minify-css', function () {
//     return gulp.src('Styles/**/*.css')
//       .pipe(cleanCSS({
//             compatibility: '*',
//             keepSpecialComments:0
//         }))
//       .pipe(rename(function (path) {
//           path.extname = ".css";
//       }))
//       .pipe(gulp.dest('prodFiles/css'));
// });


// gulp.task('minify-images', function() {
//     gulp.src('pics/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('prodFiles/images'));
// });



