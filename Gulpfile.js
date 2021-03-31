const { series } = require('gulp');
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function (done) {
  gulp.src('public/src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/src/css'));
    done()
});
 
gulp.task('watch', function () {
  gulp.watch('public/src/scss/**/*.scss', series('sass'));
});