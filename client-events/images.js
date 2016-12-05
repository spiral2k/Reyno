const ipc = require('electron').ipcRenderer;

document.getElementById('images-src-dir-trigger').addEventListener('click', () => {
    ipc.send('images-src-dialog');
});

ipc.on('images-src-dir-action', function (event, path) {
    document.getElementsByClassName('images-src-dir-input')[0].value = path;
});

document.getElementById('images-trg-dir-trigger').addEventListener('click', () => {
    ipc.send('images-trg-dialog');
});

ipc.on('images-trg-dir-action', function (event, path) {
    document.getElementsByClassName('images-trg-dir-input')[0].value = path;
});

document.getElementById('build-images').addEventListener('click', function() {
    showWrapper();
    ipc.send('build-images-ipc');
});


function showWrapper() {
    document.getElementsByClassName('wrapper')[0].style.display = 'block';
}


