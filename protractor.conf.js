/**
 * Created by Aamir on 17/01/2016.
 */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['test/**/*.e2e.js'],
    exclude: [],
    capabilities: {
        'browserName': 'phantomjs',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },
    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    framework: 'jasmine',

    allScriptsTimeout: 110000,

    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     *
     */
    useAllAngular2AppRoots: true
};
