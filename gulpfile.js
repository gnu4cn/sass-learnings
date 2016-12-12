var gulp = require('gulp'),
        gulpSass = require('gulp-sass');

gulp.task('styles', function () {
    gulp.src('sass/*.scss')
            .pipe(gulpSass())
            .pipe(gulp.dest('public/css'));
});