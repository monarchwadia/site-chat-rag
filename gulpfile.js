const gulp = require('gulp');

function defaultTask() {
    return gulp.src('./src/*')
        .pipe(gulp.dest('./dist/'));
}

function watch() {
    gulp.watch('./src/*', defaultTask);
}

gulp.task('default', defaultTask);

gulp.task('watch', watch)


exports.default = this.defaultTask