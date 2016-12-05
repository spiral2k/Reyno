const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;

var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

let css_src = null,
    css_trg = null,
    pro_send = null;



ipc.on('css-src-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile'],
        filters: [
            {name: 'css', extensions: ['css']}
        ]
    }, function (files) {
        if (files){
            css_src = files[0];
            event.sender.send('css-src-dir-action', files);
        }
    });
});

ipc.on('css-trg-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile'],
        filters: [
            {name: 'css', extensions: ['css']}
        ]
    }, function (files) {
        if (files){
            css_trg = files[0];
            event.sender.send('css-trg-dir-action', files);
        }
    });
});


ipc.on('build-css-ipc', function (event) {
    gulp.start('build-css');
    pro_send = event.sender;
});



gulp.task('build-css', function () {
    return gulp.src([css_src + '/**/*.css'])
        .pipe(cleanCSS({
            compatibility: '*',
            keepSpecialComments:0
        }))
        .pipe(rename(function (path) {
            path.extname = ".css";
        }))
        .pipe(gulp.dest(css_trg)).on('end', function(){
            pro_send.send('after-build', css_src, css_trg);
        });
});