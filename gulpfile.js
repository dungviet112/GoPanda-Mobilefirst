'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var fontmin = require('gulp-fontmin');

// // Hàm xóa assets
// function clear() {
//     return src('./assets/*', {
//         read: false
//     })
//         .pipe(clean());
// }

// Hàm auto reload browser
function serve () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['*.html'], reload);
    // gulp.watch(['assets/js/*.js'], reload);
    gulp.watch(['assets/css/*.css'], reload);
    gulp.watch(['assets/image/*.css'], reload);
}

//Hàm minify js,css,images,fonts
function compress() {
    //cấu hình minify js
    // gulp.src('assets/js/*.js') //đường dẫn đến thư mục chứa các file js
    //     .pipe(minify({
    //         exclude: ['tasks'],
    //         ignoreFiles: ['-min.js'] //những file không muốn nén
    //     }))
    //     .pipe(gulp.dest('dist/js')); //thư mục dùng để chứa các file js sau khi nén

    //cấu hình minify css
    gulp.src('assets/css/*.css') //đường dẫn đến thư mục chứa các file css
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css')); //thư mục dùng để chứa các file css sau khi nén

    //cấu hình minify image
    gulp.src('assets/image/*') //đường dẫn đến thư mục chứa các file images
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/image')); //thư mục dùng để chứa các file images sau khi nén

    gulp.src('assets/fonts/*/*.ttf')
        .pipe(fontmin({
            text: 'vdung',
        }))
        .pipe(gulp.dest('dist/fonts'));
}

function buildStyles() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
}

exports.compress = compress;
exports.serve = serve;
exports.buildStyles = buildStyles;
exports.watch = function () {
    gulp.watch('assets/scss/*.scss', ['sass']);
};