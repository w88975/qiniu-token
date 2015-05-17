var gulp = require('gulp'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat');

gulp.task('build',function () {
    gulp.src('lib/*.js')
    .pipe(concat('qiniu-token.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('bin/'));
});
