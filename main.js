const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { session } = require('electron');
let mainWindow;

// Services
require('./service/javascript');
require('./service/css');
require('./service/images');

let defaultWindowOpts = require('electron-browser-window-options');

var myOpts = Object.assign({}, defaultWindowOpts, {
  // minWidth: 700,
  // minHeight: 500,
  // maxWidth: 700,
  // maxHeight: 500,
  // resizable: false,
  backgroundColor: '#fff'
});

function createWindow () {
  mainWindow = new BrowserWindow(myOpts);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  //clear session
  const ses = session.fromPartition('persist:name');
  ses.clearStorageData();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
