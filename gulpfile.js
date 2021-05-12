// ---------- Gulp dependencies ---------- //

const {
    src,
    dest,
    watch,
    series,
    parallel
}                   = require('gulp'),
    dustHtml        = require('gulp-dust-html'),
    htmlBeautify    = require('gulp-html-beautify'),
    sass            = require('gulp-sass'),
    sassLint        = require('gulp-sass-lint'),
    browserify      = require('browserify'),
    clean           = require('gulp-clean'),
    autoprefixer    = require('autoprefixer'),
    flexbugsFixes   = require('postcss-flexbugs-fixes'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    sourcemaps      = require('gulp-sourcemaps'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename'),
    cssnano         = require('cssnano'),
    vinylSource     = require('vinyl-source-stream'),
    vinylBuffer     = require('vinyl-buffer'),
    babel           = require('gulp-babel'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify-es').default,
    iconfont        = require('gulp-iconfont'),
    iconfontCss     = require('gulp-iconfont-css'),
    imagemin        = require('gulp-imagemin');

// ---------- Paths ---------- //

const paths = {
    templates: {
        src: 'templates',
        dist: './'
    },
    styles: {
        src: 'scss/**/*.s+(c|a)ss',
        dest: 'src/css',
        dist: 'src/css/dist'
    },
    js: {
        src: 'js',
        dest: 'src/js',
        dist: 'src/js/dist'
    },
    icons: {
        src: 'assets/icons/*.svg',
        config: 'config/iconfont.scss',
        target: 'scss/fonts/_iconfont.scss',
        dist: 'assets/fonts/dist/'
    },
    img: {
        src: 'assets/images',
        dist: 'assets/images/dist'
    }
};

// ---------- Error ---------- //

const error = {
    errorHandler: notify.onError({
        title: "Warning, mistake found! Fix it...",
        message: 'Error: <%= error.message %>'
    })
};

// ---------- HTML ---------- //

function html() {
    return src(paths.templates.src + '/pages/**/*.html')
        .pipe(dustHtml({
            basePath: 'templates',
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
        .pipe(dest(paths.templates.dist));
}

function htmlClean() {
    return src(paths.templates.dist + '*.html', {
        allowEmpty: true,
        read: false
    }) 
        .pipe(clean());
}

// ---------- Style ---------- //

function styles() {

    const plugins = [
        autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'ios >= 8']
        }),
        flexbugsFixes({
            bug4: true,
            bug6: true,
            bug81a: true
        })
    ];

    return src(paths.styles.src)
        .pipe(plumber(error))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            indentWidth: 4,
            precision: 3
        }))
        .pipe(postcss(plugins))
        .pipe(dest(paths.styles.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss(cssnano))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dist));
}

function sasslint() {
    return src(paths.styles.src)
        .pipe(sassLint({
            config: '.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}

// ---------- JavaScript ---------- //

function jsMain() {
    return browserify(paths.js.src + '/main.js').bundle()
        .pipe(vinylSource('main.js'))
        .pipe(vinylBuffer())
        .pipe(babel({
            presets: ['@babel/env'],
            compact: false,
            comments: false
        }))
        .pipe(dest(paths.js.dest));
}

function jsAddons() {
    return src([paths.js.src + '/libs/**/*.js', paths.js.src + '/plugins/**/*.js'])
        .pipe(concat('addons.js'))
        .pipe(dest(paths.js.dest));
}

function jsMerge() {
    return src([paths.js.dest + '/addons.js', paths.js.dest + '/main.js'], {
        allowEmpty: true
    })
        .pipe(plumber(error))
        .pipe(sourcemaps.init())
        .pipe(concat('global.js'))
        .pipe(dest(paths.js.dest))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.js.dist));
}

function jsClean() {
    return src([paths.js.dest + '/main.js', paths.js.dest + '/addons.js'], {
        allowEmpty: true,
        read: false
    })
        .pipe(clean());
}

// ---------- Watcher ---------- //

function watcher() {
    // Watch HTML files
    watch([paths.templates.src + '/**/*.html', !paths.templates.src + '/*.html'], html);
    // Watch SCSS files
    watch(paths.styles.src, stylesBuild);
    // Watch JS files
    watch([paths.js.src + '/**/*.js', !paths.js.src + '/libs/**/*.js', !paths.js.src + '/plugins/**/*.js'], jsBuild);
}

// ---------- Iconfont ---------- //

function iconToFont() {

    const runTimestamp = Math.round(Date.now()/1000);
    const fontName = 'flat-icon';

    return src(paths.icons.src)
        .pipe(iconfontCss({
            // Name that the generated font will have
            fontName: fontName,
            // CSS class that font will have (example: class="font-svgName")
            cssClass: 'font',
            // Path to the template that will be used to create the SASS/LESS/SCSS/CSS file
            path: paths.icons.config,
            // Path where the file will be generated (relative to 'style.min.css')
            targetPath: '../../../' + paths.icons.target,
            // Path to the icon font file (relative to 'style.min.css')
            fontPath: '../../../' + paths.icons.dist,
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
            // Center Horizontaly
			centerHorizontally: true,
            // Recommended to get consistent builds when watching files
            timestamp: runTimestamp
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(dest(paths.icons.dist));
}

// ---------- Image minify ---------- //

function imgMin() {
    return src([paths.img.src + '/*'], [!paths.img.dist + '/*'])
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
        .pipe(dest(paths.img.dist));
}

// ---------- Exports ---------- //

const stylesBuild = series(styles, sasslint);
const jsBuild = series(jsMain, jsAddons, jsMerge, jsClean);
const build = series(parallel(html, stylesBuild, jsBuild), watcher);

exports.html        = html;
exports.htmlClean   = htmlClean;
exports.styles      = styles;
exports.sasslint    = sasslint;
exports.jsMain      = jsMain;
exports.jsAddons    = jsAddons;
exports.jsMerge     = jsMerge;
exports.jsClean     = jsClean;
exports.iconfont    = iconToFont;
exports.imgMin      = imgMin;
exports.watch       = watcher;
exports.stylesBuild = stylesBuild;
exports.jsBuild     = jsBuild;
exports.default     = build;
