const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const { babel: rollupBabel } = require('@rollup/plugin-babel');
const fs = require('fs');
const postcss = require('gulp-postcss');
const { default: commonjs } = require('@rollup/plugin-commonjs');
const nodeResolve = require("@rollup/plugin-node-resolve")
const replace = require("@rollup/plugin-replace")

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
        input: './src/sidebar.tsx',
        plugins: [
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            nodeResolve(), // Import modules and include in the bundle
            rollupBabel({ // Transpile React and Typescript
                babelHelpers: 'bundled',
                presets: [['@babel/preset-react', { "runtime": "automatic" }]],
                sourceMaps: "both",
                extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.tsx', '.ts'],
                minified: process.env.NODE_ENV === 'production'
            }),
            replace({ // Previous step uses `process.env` so we need to replace it
                'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? JSON.stringify('production') : JSON.stringify('development'),
                __buildDate__: () => JSON.stringify(new Date()),
                __buildVersion: 15
            })
        ]
    }).then(bundle => {
        return bundle.write({
            dir: './dist/',
            format: 'iife'
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

gulp.task('watch', gulp.series('build', function () {
    return gulp.watch('./src/*', gulp.task('build'));
}));

gulp.task('default', gulp.task('build'));


exports.default = gulp.task('default');
