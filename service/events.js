/* Menu navigation */

var menuevent = document.getElementsByClassName('menu-event'),
    page = document.getElementsByClassName('page');

for(var i = 0; i < menuevent.length; i++){
    menuevent[i].addEventListener("click", menuItemClick);
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


