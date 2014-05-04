module.exports = function (config) {
    config.set({

        basePath : 'test/e2e/',

        files: [
            '**/*.js'
            //'home/*.js'
            //'book/add-book-form.js'
        ],

        autoWatch: true,

        urlRoot: '/_karma_/',

        browsers: [
            //'IE',
            //'Chrome',
            //'Firefox',
            'PhantomJS'
        ],

        frameworks: ['ng-scenario'],

        singleRun: true,

        proxies: {
            '/': 'http://localhost:9000/'
        },

        plugins: [
            'karma-ng-scenario',
            'karma-ie-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ],

        reporters: ['progress', 'junit'],

        junitReporter: {
            outputFile: '../e2e.xml',
            suite: 'e2e'
        }

    });
};