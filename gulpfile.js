const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const fs = require('fs');
const postcss = require('gulp-postcss');

// === Subtasks ===

gulp.task('clean', async function () {
    const dirExists = fs.existsSync('./dist');

    if (!dirExists) {
        return Promise.resolve(true);
    }

    return fs.rmSync('./dist', { recursive: true });
})

gulp.task('copyFiles', function () {
    return gulp.src(
        [
            'src/**/*',
            '!src/**/*.ts',
            '!src/**/*.tsx',
            '!src/**/*.js',
            '!src/**/*.jsx',
            '!src/**/*.css'
        ],
        { base: './src' }
    )
        .pipe(gulp.dest('./dist/'));
})

gulp.task('rollup', function rollupTask() {
    return rollup.rollup({
        input: './src/sidebar.ts',
        plugins: [rollupTypescript({
            tsconfig: './tsconfig.json'
        })]
    }).then(bundle => {
        return bundle.write({
            file: './dist/sidebar.js',
            format: 'cjs'
        });
    });
});

gulp.task('postcss', function () {
    return gulp.src('./src/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./dist/'));
})

// === Main tasks ===

gulp.task('build', gulp.series('clean', 'copyFiles', 'rollup', 'postcss'));

gulp.task('watch', function () {
    return gulp.watch('./src/*', gulp.task('build'));
})

gulp.task('default', gulp.task('build'));


exports.default = gulp.task('default');
