
const $ = require("jquery"),
      ipc = require('electron').ipcRenderer;

document.getElementById('javascript-src-dir-trigger').addEventListener('click', () => {
  //document.getElementById('business').click();
  ipc.send('javascript-src-dialog');
});

ipc.on('javascript-src-dir-action', function (event, path) {
  console.log(`You selected: ${path}`);
  $('.javascript-src-dir-input').val(path);
});

/*-------------------------------------*/

document.getElementById('javascript-trg-dir-trigger').addEventListener('click', () => {
  //document.getElementById('business').click();
  ipc.send('javascript-trg-dialog')
});

ipc.on('javascript-trg-dir-acti\on', function (event, path) {
  console.log(`You selected: ${path}`);
  $('.javascript-trg-dir-input').val(path);
});

document.getElementById('go').addEventListener('click', () => {
  //document.getElementById('business').click();
  $('.wrapper').show();
  ipc.send('proccess');
});


ipc.on('prossess-after', function (event, src, trg) {
    $('.wrapper').hide();
    alert('finish build!');
    console.log(`all good: ${src} ${trg}`);
});


var menuitem = document.getElementsByClassName('menu-item');

var page = document.getElementsByClassName('page');


for(var i = 0; i < menuitem.length; i++){
    menuitem[i].addEventListener("click", menuItemClick);
}

function menuItemClick(event){
    var id = event.target.getAttribute('id');
    for(var i = 0; i < page.length; i++) {
        page[i].style.display = "none";
    }
    var target = document.getElementsByClassName('page ' + id);
    if(target[0])
        target[0].style.display = "block";
}

// $('.menu-item').click(function(e){
//
//     var id = $(e.target).attr("id");
//     $('.page').hide();
//     $('.page.' + id).show();
//
// });


