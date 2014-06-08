
var gulp      = require('gulp'),
    clean     = require('gulp-clean'),
    notify    = require('gulp-notify'),
    uglify    = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

gulp.task('default', ['clean'], function() {

  gulp.start('minify-css', 'minify-js');

});

gulp.task('watch', function () {

  gulp.watch('public/src/css/*.css', ['minify-css']);

  gulp.watch('public/src/js/*.js', ['minify-js']); 

});

gulp.task('clean', function () {

  return gulp.src(['public/dist/css', 'public/dist/js'], { read: false })
    .pipe(clean());

});

gulp.task('minify-css', function () {

  return gulp.src('public/src/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('public/dist/css/'))
    .pipe(notify({ message: 'Minify-css task complete' }));

});

gulp.task('minify-js', function () {

  return gulp.src('public/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
    .pipe(notify({ message: 'Minify-js task complete' }));

});