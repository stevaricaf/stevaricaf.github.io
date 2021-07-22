// ---------- Gulp includes ---------- //

const {
    watch,
    series
}               = require('gulp'),
    _paths      = require('./_config'),
    _html       = require('./_html'),
    _style      = require('./_style'),
    _lint       = require('./_lint'),
    _js         = require('./_javascript'),
    browserSync = require('browser-sync').create();

// ---------- Browser sync (local server) ---------- //

function localServer(done) {
    browserSync.init({
        port: 8080,
        open: true,
        notify: false,
        server: {
            baseDir: _paths.template.dest,
            index: 'index.html'
        }
    });

    done();
}

// ---------- Browser sync reload ---------- //

function reloadServer(done) {
    browserSync.reload();
    done();
}

// ---------- Watcher ---------- //

function watcher(done) {
    // Watch HTML files
    watch(_paths.template.watch, series(_html.html, reloadServer));
    // Watch CSS/SASS/SCSS files
    watch(_paths.style.watch, series(styleBuild, reloadServer));
    // Watch JS files
    watch(_paths.js.watch, series(jsBuild, reloadServer));

    done();
}

// ---------- Gulp exports ---------- //

const   server      = series(localServer, watcher),
        styleBuild  = series(_style.style, _lint.styleLint),
        jsBuild     = series(_js.main, _js.addons, _js.merge, _js.remove, reloadServer);

exports.server = server;
