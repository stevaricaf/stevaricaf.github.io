// ---------- Gulp dependencies ---------- //

const {
    src,
    dest
}           = require('gulp'),
    _paths  = require('./_config');

// ---------- Templates production ---------- //

function templateBuild() {
    return src(_paths.build.template.src)
    .pipe(dest(_paths.build.template.dest));
}

// ---------- Source production ---------- //

function srcBuild() {
    return src(_paths.build.src.src)
    .pipe(dest(_paths.build.src.dest));
}

// ---------- Assets production ---------- //

function assetsBuild() {
    return src(_paths.build.asset.src)
    .pipe(dest(_paths.build.asset.dest));
}

// ---------- Favicon production ---------- //

function faviconBuild() {
    return src(_paths.build.favicon.src, {
        allowEmpty: true
    })
    .pipe(dest(_paths.build.favicon.dest));
}

// ---------- Gulp exports ---------- //

exports.htmlBuild       = templateBuild;
exports.srcBuild        = srcBuild;
exports.assetsBuild     = assetsBuild;
exports.faviconBuild    = faviconBuild;
