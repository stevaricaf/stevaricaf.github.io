// ---------- Gulp includes ---------- //

const {
    src,
    dest
}               = require('gulp'),
    _paths      = require('./_config'),
    _plugins    = require('./_plugins'),
    browserify  = require('browserify'),
    vinylSource = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    babel       = require('gulp-babel'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    sourcemaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify-es').default,
    clean       = require('gulp-clean');

// ---------- JavaScript ---------- //

function jsMain() {
    return browserify(_paths.js.main).bundle()
    .pipe(vinylSource('main.js'))
    .pipe(vinylBuffer())
    .pipe(babel({
        presets: ['@babel/env'],
        compact: false,
        comments: false
    }))
    .pipe(dest(_paths.js.dest));
}

function jsAddons() {
    return src(_paths.js.addons)
    .pipe(concat('addons.js'))
    .pipe(dest(_paths.js.dest));
}

function jsMerge() {
    return src(_paths.js.merge, {
        allowEmpty: true
    })
    .pipe(plumber(_plugins.plumberError))
    .pipe(sourcemaps.init())
    .pipe(concat('global.js'))
    .pipe(dest(_paths.js.dest))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(_paths.js.dist));
}

function jsRemove() {
    return src(_paths.js.remove, {
        allowEmpty: true,
        read: false
    })
    .pipe(clean());
}

// ---------- Gulp exports ---------- //

exports.main    = jsMain;
exports.addons  = jsAddons;
exports.merge   = jsMerge;
exports.remove  = jsRemove;
