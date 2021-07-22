// ---------- Gulp includes ---------- //

const {
    src,
    dest
}               = require('gulp'),
    _paths      = require('./_config'),
    _plugins    = require('./_plugins'),
    sass        = require('gulp-sass')(require('sass')),
    plumber     = require('gulp-plumber'),
    sourcemaps  = require('gulp-sourcemaps'),
    postcss     = require('gulp-postcss'),
    rename      = require('gulp-rename'),
    cssnano     = require('cssnano');

// ---------- Style ---------- //

function style() {
    return src(_paths.style.src)
    .pipe(plumber(_plugins.plumberError))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
        indentWidth: 4,
        precision: 3
    }))
    .pipe(postcss(_plugins.stylePlugins))
    .pipe(dest(_paths.style.dest))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(postcss(cssnano))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(_paths.style.dist));
}

// ---------- Gulp exports ---------- //

exports.style = style;
