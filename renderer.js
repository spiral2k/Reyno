
const ipc = require('electron').ipcRenderer;

/* App Events */
require('./service/events');

require('./client-events/javascript');
require('./client-events/css');
require('./client-events/images');

/*-------------------------------------*/

ipc.on('prossess-after', function (event, src, trg) {
    hideWrapper();
});

/*-------------------------------------*/

function hideWrapper() {
    document.getElementsByClassName('wrapper')[0].style.display = 'none';
}

