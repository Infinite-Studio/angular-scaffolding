module.exports = function (config) {
    config.set({

        frameworks: ['jasmine'],

        autoWatch: true,

        files: [
            'app/bower_components/jquery/dist/jquery.min.js',
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-resource/angular-resource.min.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'app/bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-strap/dist/angular-strap.js',
            'app/src/modules/**/*.js',
            'app/src/app.js',
            'app/src/appMock.js',
            'app/src/resources/**/*.js',
            'app/src/main/**/*.js',
            'test/unit/**/*.js'
        ],

        browsers: ['PhantomJS'],

        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: 'test/unit.xml',
            suite: 'unit'
        }

    });
};