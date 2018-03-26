const gulp = require('gulp');
const browserSync = require('browser-sync');
const cache = require('gulp-cache');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const postcssPlugins = [
    autoprefixer({
        browsers: ['last 1 version']
    }),
    pxtorem({
        rootValue: 16
    })
];

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dest'
        },
        notify: false
    });
});

gulp.task('html', function() {
    return gulp.src('src/html/*.html')
        .pipe(gulp.dest('dest'));
});

gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dest/css'));
});

gulp.task('css', function(){
    return gulp.src('src/css/**/*.css')
        .pipe(postcss(postcssPlugins))
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dest/js')); // Выгружаем в папку dest/js
});

gulp.task('watch', ['browser-sync', 'html', 'css', 'scripts', 'sass', 'img'], function() {
    gulp.watch('src/html/*.html', ['html']);
    gulp.watch('src/html/*.html', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/scss/**/*.scss', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('dest/js/**/*.js', browserSync.reload);
    gulp.watch('src/img/*', ['img']);
    gulp.watch('src/img/*', browserSync.reload);
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dest/img'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);

