const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
const { babel: rollupBabel } = require('@rollup/plugin-babel');
const fs = require('fs');
const postcss = require('gulp-postcss');
const { default: commonjs } = require('@rollup/plugin-commonjs');
const nodeResolve = require("@rollup/plugin-node-resolve")
const replace = require("@rollup/plugin-replace");
const { default: typescript } = require('@rollup/plugin-typescript');

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

gulp.task('rollup-most-files', function rollupTask() {
    return rollup.rollup({
        input: {
            "entrypoints/newtab/newtab": './src/entrypoints/newtab/newtab.tsx',
            "entrypoints/popup/popup": './src/entrypoints/popup/popup.tsx',
            "entrypoints/sidebar/sidebar": './src/entrypoints/sidebar/sidebar.tsx',
            "entrypoints/content/content": './src/entrypoints/content/content.ts',
        },
        plugins: [
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }), // Import modules and include in the bundle
            rollupBabel({ // Transpile React and Typescript
                babelHelpers: 'bundled',
                presets: [['@babel/preset-typescript'], ['@babel/preset-react', { "runtime": "automatic" }]],
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
            format: 'esm'
        });
    });
});

gulp.task('rollup-content-main', function rollupTask() {
    return rollup.rollup({
        input: {
            "entrypoints/content/content-main": './src/entrypoints/content/content-main.ts'
        },
        plugins: [
            commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
            nodeResolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }), // Import modules and include in the bundle
            rollupBabel({ // Transpile React and Typescript
                babelHelpers: 'bundled',
                presets: [['@babel/preset-typescript'], ['@babel/preset-react', { "runtime": "automatic" }]],
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
    return gulp.src([
        './src/*.css'
    ])
        .pipe(postcss())
        .pipe(gulp.dest('./dist/'));
})

// === Main tasks ===

gulp.task('rollup', gulp.parallel('rollup-most-files', 'rollup-content-main'));

gulp.task('build', gulp.series('clean', 'copyFiles', 'postcss', 'rollup'));

gulp.task('watch', gulp.series('build', function () {
    return gulp.watch('./src/**/*', gulp.task('build'));
}));

gulp.task('default', gulp.task('build'));


exports.default = gulp.task('default');
