// ---------- Paths ---------- //

module.exports = {

    template: {
        src: 'root/templates/pages/**/*.html',
        dest: 'root/',
        basePath: 'root/templates/',
        watch: ['root/templates/**/*.html', '!root/templates/*.html']
    },
    style: {
        src: 'root/scss/**/*.s+(c|a)ss',
        dest: 'root/src/css/',
        dist: 'root/src/css/dist/',
        watch: 'root/scss/**/*.s+(c|a)ss',
    },
    js: {
        src: 'root/js/',
        dest: 'root/src/js/',
        dist: 'root/src/js/dist/',
        main: 'root/js/main.js',
        addons: ['root/js/libs/**/*.js', 'root/js/plugins/**/*.js'],
        merge: ['root/src/js/addons.js', 'root/src/js/main.js'],
        remove: ['root/src/js/addons.js', 'root/src/js/main.js'],
        watch: ['root/js/**/*.js', '!root/js/libs/**/*.js', 'root/js/plugins/**/*.js']
    },
    icon: {
        src: 'root/assets/icons/*.svg',
        dist: 'root/assets/fonts/dist/',
        config: 'root/config/iconfont.scss',
        targetPath: '../../../scss/fonts/_iconfont.scss',
        fontPath: '../../../assets/fonts/dist/'
    },
    image: {
        src: ['root/assets/images/*', '!root/assets/images/dist'],
        dist: 'root/assets/images/dist/'
    },
    build: {
        template: {
            src: 'root/*.html',
            dest: './'
        },
        src: {
            src: 'root/src/**',
            dest: './src/'
        },
        asset: {
            src: 'root/assets/**',
            dest: './assets/'
        },
        favicon: {
            src: 'root/favicon.ico',
            dest: './'
        }
    }
    
}
