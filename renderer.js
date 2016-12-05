
const $ = require("jquery"),
      ipc = require('electron').ipcRenderer;

/* App Events */
require('./service/events');


/*-------------------------------------*/

document.getElementById('javascript-src-dir-trigger').addEventListener('click', () => {
  ipc.send('javascript-src-dialog');
});

ipc.on('javascript-src-dir-action', function (event, path) {
  console.log(`You selected: ${path}`);
  $('.javascript-src-dir-input').val(path);
});

document.getElementById('javascript-trg-dir-trigger').addEventListener('click', () => {
  //document.getElementById('business').click();
  ipc.send('javascript-trg-dialog')
});

ipc.on('javascript-trg-dir-action', function (event, path) {
  console.log(`You selected: ${path}`);
  $('.javascript-trg-dir-input').val(path);
});

document.getElementById('build-js').addEventListener('click', function() {
  $('.wrapper').show();
  ipc.send('build-js-ipc');
});

/*-------------------------------------*/


document.getElementById('css-src-dir-trigger').addEventListener('click', () => {
    ipc.send('css-src-dialog');
});

ipc.on('css-src-dir-action', function (event, path) {
    console.log(`You selected: ${path}`);
    $('.css-src-dir-input').val(path);
});

document.getElementById('css-trg-dir-trigger').addEventListener('click', () => {
    //document.getElementById('business').click();
    ipc.send('css-trg-dialog')
});

ipc.on('css-trg-dir-action', function (event, path) {
    console.log(`You selected: ${path}`);
    $('.css-trg-dir-input').val(path);
});

document.getElementById('build-css').addEventListener('click', function() {
    $('.wrapper').show();
    ipc.send('build-css-ipc');
});


/*-------------------------------------*/


document.getElementById('images-src-dir-trigger').addEventListener('click', () => {
    ipc.send('images-src-dialog');
});

ipc.on('images-src-dir-action', function (event, path) {
    console.log(`You selected: ${path}`);
    $('.images-src-dir-input').val(path);
});

document.getElementById('images-trg-dir-trigger').addEventListener('click', () => {
    //document.getElementById('business').click();
    ipc.send('images-trg-dialog')
});

ipc.on('images-trg-dir-action', function (event, path) {
    console.log(`You selected: ${path}`);
    $('.images-trg-dir-input').val(path);
});

document.getElementById('build-images').addEventListener('click', function() {
    $('.wrapper').show();
    ipc.send('build-images-ipc');
});


/*-------------------------------------*/


ipc.on('prossess-after', function (event, src, trg) {
    $('.wrapper').hide();
    alert('finish build!');
    console.log(`all good: ${src} ${trg}`);
});