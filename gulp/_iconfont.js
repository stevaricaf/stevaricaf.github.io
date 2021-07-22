// ---------- Gulp includes ---------- //

const {
    src,
    dest
}               = require('gulp'),
    _paths      = require('./_config'),
    iconfont    = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css');

// ---------- Style ---------- //

function iconToFont() {

    const runTimestamp = Math.round(Date.now()/1000);
    const fontName = 'font-icon';

    return src(_paths.icon.src)
    .pipe(iconfontCss({
        // Name that the generated font will have
        fontName: fontName,
        // CSS class that font will have (example: class="font-fontName")
        cssClass: 'font',
        // Path to the template that will be used to create the SASS/LESS/SCSS/CSS file
        path: _paths.icon.config,
        // Path where the file will be generated (relative to 'style.min.css')
        targetPath: _paths.icon.targetPath,
        // Path to the icon font file (relative to 'style.min.css')
        fontPath: _paths.icon.fontPath
    }))
    .pipe(iconfont({
        // Name that the generated font will have
        fontName: fontName,
        // Recommended option (true)
        prependUnicode: true,
        // Font file formats that will be created
        formats: ['ttf', 'woff', 'woff2'],
        // Normalizing font width and height
        normalize: true,
        // Make fixed font size
        fontHeight: 1024,
        // Center Horizontaly
        centerHorizontally: true,
        // Recommended to get consistent builds when watching files
        timestamp: runTimestamp
    }))
    .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
    })
    .pipe(dest(_paths.icon.dist));
}

// ---------- Gulp exports ---------- //

exports.iconfont = iconToFont;
