/**
 * Created by Aamir on 17/01/2016.
 */

var path = require('path');

module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.config.js');
    config.set({

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '',

        frameworks: ['jasmine'],

        exclude: [ ],

        files: [ { pattern: 'spec-bundle.js', watched: false } ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: { 'spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

        webpack: testWebpackConfig,

        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'text' },
                { type: 'json' },
                { type: 'html' }
            ]
        },

        webpackServer: { noInfo: true },

        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'progress', 'coverage' ],

        port: 9876,

        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: [ 'PhantomJS' ],

        singleRun: true
    });

};
