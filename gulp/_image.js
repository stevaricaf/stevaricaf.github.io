// ---------- Gulp includes ---------- //

const {
    src,
    dest
}               = require('gulp'),
    _paths      = require('./_config'),
    imagemin    = require('gulp-imagemin');

// ---------- Style ---------- //

function imgmin() {
    return src(_paths.image.src)
    .pipe(imagemin([
        imagemin.gifsicle({
            interlaced: true,
        }),
        imagemin.mozjpeg({
            quality: 75,
            progressive: true,
        }),
        imagemin.optipng({
            optimizationLevel: 5,
        }),
    ], {
        verbose: true,
    }))
    .pipe(dest(_paths.image.dist));
}

// ---------- Gulp exports ---------- //

exports.imgmin = imgmin;
