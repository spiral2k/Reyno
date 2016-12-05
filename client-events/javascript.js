const ipc = require('electron').ipcRenderer;

document.getElementById('javascript-src-dir-trigger').addEventListener('click', function() {
    ipc.send('javascript-src-dialog');
});

ipc.on('javascript-src-dir-action', function (event, path) {
    document.getElementsByClassName('javascript-src-dir-input')[0].value = path;
});

document.getElementById('javascript-trg-dir-trigger').addEventListener('click', function() {
    ipc.send('javascript-trg-dialog');
});

ipc.on('javascript-trg-dir-action', function (event, path) {
    document.getElementsByClassName('javascript-trg-dir-input')[0].value = path;
});

document.getElementById('build-js').addEventListener('click', function() {
    showWrapper();
    console.log("js build start");
    ipc.send('build-js-ipc');
});


function showWrapper() {
    document.getElementsByClassName('wrapper')[0].style.display = 'block';
}


