// ---------- Gulp includes ---------- //

const   notify          = require('gulp-notify'),
        autoprefixer    = require('autoprefixer'),
        flexbugsFixes   = require('postcss-flexbugs-fixes');

// ---------- Notification ---------- //

// Plumber error
const plumberError = {
    errorHandler: notify.onError({
        title: "Warning, you made a mistake! Fix it...",
        message: 'Error: <%= error.message %>'
    })
}

// Style plugin
const stylePlugins = [
    autoprefixer({
        overrideBrowserslist: ['last 2 versions', 'ios >= 8']
    }),
    flexbugsFixes({
        bug4: true,
        bug6: true,
        bug81a: true
    })
];

// ---------- Gulp exports ---------- //

exports.plumberError = plumberError;
exports.stylePlugins = stylePlugins;
