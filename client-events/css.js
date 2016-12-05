const ipc = require('electron').ipcRenderer;

document.getElementById('css-src-dir-trigger').addEventListener('click', () => {
    ipc.send('css-src-dialog');
});

ipc.on('css-src-dir-action', function (event, path) {
    document.getElementsByClassName('css-src-dir-input')[0].value = path;
});

document.getElementById('css-trg-dir-trigger').addEventListener('click', () => {
    ipc.send('css-trg-dialog');
});

ipc.on('css-trg-dir-action', function (event, path) {
    document.getElementsByClassName('css-trg-dir-input')[0].value = path;
});

document.getElementById('build-css').addEventListener('click', function() {
    showWrapper();
    ipc.send('build-css-ipc');
});

function showWrapper() {
    document.getElementsByClassName('wrapper')[0].style.display = 'block';
}


