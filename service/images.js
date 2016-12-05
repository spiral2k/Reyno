const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

let images_src = null,
    images_trg = null,
    pro_send = null;




ipc.on('images-src-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile'],
        filters: [
            {name: 'images', extensions: ['png', 'jpg', 'jpeg', 'gif']}
        ]
    }, function (files) {
        if (files){
            images_src = files[0];
            event.sender.send('images-src-dir-action', files);
        }
    });
});

ipc.on('images-trg-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile'],
        filters: [
            {name: 'images', extensions: ['png', 'jpg', 'jpeg', 'gif']}
        ]
    }, function (files) {
        if (files){
            images_trg = files[0];
            event.sender.send('images-trg-dir-action', files);
        }
    });
});

ipc.on('build-images-ipc', function (event) {
    console.log("Proccess START");
    gulp.start('build-images');
    pro_send = event.sender;
});


gulp.task('build-images', function() {

    console.log("Build images", images_src, images_trg)

    gulp.src(images_src + '/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(images_trg)).on('end', function(){
        pro_send.send('prossess-after', images_src, images_trg);
    });
});

