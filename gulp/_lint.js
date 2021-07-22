// ---------- Gulp includes ---------- //

const {
    src
}               = require('gulp'),
    _paths      = require('./_config'),
    sassLint    = require('gulp-sass-lint');

// ---------- Sass lint ---------- //

function styleLint() {
    return src(_paths.style.src)
    .pipe(sassLint({
        config: '.sass-lint-config.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

// ---------- Gulp exports ---------- //

exports.styleLint = styleLint;
