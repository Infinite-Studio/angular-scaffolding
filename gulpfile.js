'use strict';

var gulp = require('gulp');
var open = require('open');

// Load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', function () {
    return gulp.src('app/src/main/style.scss')
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/'));
});

// Copy
gulp.task('copy', ['clean'], function(){
    return gulp.src([
        'app/index.html',
        'app/robots.txt',
        'app/**/*.json'
    ]).pipe(gulp.dest('dist'));
});

// Templates
gulp.task('template', ['html'], function () {
    return gulp.src(['app/src/**/*.html'])
        .pipe($.angularTemplatecache({module: 'app', root: 'src/'}))
        .pipe(gulp.dest('dist/scripts'));
});

// HTML
gulp.task('html', ['styles'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/index.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist'], { read: false }).pipe($.clean());
});

// Build
gulp.task('dist', ['copy', 'template'], function(){
    return gulp.src([
            'dist/**/*.js',
            'dist/**/*.css'
        ])
        .pipe($.manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'app.manifest',
            exclude: 'app.manifest'
        }))
        .pipe($.replace(/%5C/g, '\/'))// Bug into manifest plugin 0.0.4
        .pipe(gulp.dest('dist'));
});

// Default task
gulp.task('default', ['serve']);

gulp.task('server', ['styles'], function() {
    $.connect.server({
        root: ['app'],
        port: 9000,
        livereload: true
    });
    open('http://localhost:9000');
});

gulp.task('serve:production', function() {
    $.connect.server({
        root: ['dist'],
        port: 9000
    });
    open('http://localhost:9000');
});

// Test
gulp.task('test:unit', function(){
    gulp.src('not-exist.js').pipe($.plumber()).pipe($.karma({configFile: 'karma.conf.js'}));
});
gulp.task('test:e2e', function(){
    gulp.src('not-exist.js').pipe($.plumber()).pipe($.karma({configFile: 'karma.conf.e2e.js'}));
});

// Watch
gulp.task('serve', ['server'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/index.html',
        'app/style.css',
        'app/src/**/*.html',
        'app/src/**/*.js',
        'app/modules/**/*.js',
    ], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });

    // Watch .scss files
    gulp.watch('app/src/**/*.scss', ['styles']);
});

// Test
gulp.task('test', ['test:unit', 'test:e2e']);
