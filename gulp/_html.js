// ---------- Gulp includes ---------- //

const {
    src,
    dest
}                   = require('gulp'),
    _paths          = require('./_config'),
    dustHtml        = require('gulp-dust-html'),
    htmlBeautify    = require('gulp-html-beautify');

// ---------- Template ---------- //

function template() {
    return src(_paths.template.src)
    .pipe(dustHtml({
        basePath: _paths.template.basePath,
        data: {},
        whitespace: true,
        defaultExt: '.html',
        config: {
            cache: false
        }
    }))
    .pipe(htmlBeautify({
        indent_size: 4,
        indent_char: '',
        indent_with_tabs: true,
        preserve_newlines: false,
        end_with_newline: true
    }))
    .pipe(dest(_paths.template.dest));
}

// ---------- Gulp exports ---------- //

exports.html = template;
