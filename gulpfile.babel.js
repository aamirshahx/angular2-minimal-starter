import gulp from 'gulp';
import { default as runInSync} from "run-sequence";
import gulpLoadPlugins from "gulp-load-plugins";
import webpack from 'webpack';
import karma from 'karma';

var $ = gulpLoadPlugins({});
var watch = false;
var verbose = false;
var webpackOptions = {
    colors: $.util.colors.supportsColor,
    hash: verbose,
    version: verbose,
    timings: verbose,
    chunks: verbose,
    chunkModules: verbose,
    cached: verbose,
    cachedAssets: verbose
};

var typedocOptions = {
    "mode": "modules",
    "out": 'doc',
    "theme": "default",
    "ignoreCompilerErrors": "true",
    "experimentalDecorators": "true",
    "emitDecoratorMetadata": "true",
    "target": "ES5",
    "moduleResolution": "node",
    "preserveConstEnums": "true",
    "stripInternal": "true",
    "suppressExcessPropertyErrors": "true",
    "suppressImplicitAnyIndexErrors": "true",
    "module": "commonjs"
};

var karmaOptions = {
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
};

var protractorOptions = {
    configFile: process.cwd() + '/protractor.conf.js'
};

gulp.task("build", function (cb) {
    var started = false;
    var config = require(process.cwd() + '/webpack.config.js').default;
    var bundler = webpack(config);
    var verbose = true;

    function bundle(err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }
        var logOptions = webpackOptions;
        var log = stats.toString(logOptions);
        console.log(log);

        if (!started) {
            started = true;
            return cb();
        }
    }

    watch ? bundler.watch(200, bundle) : bundler.run(bundle);
});

gulp.task('docs', function (cb) {
    return gulp.src([ 'app/**/*.ts', '!app/**/vendor.ts' ])
        .pipe($.typedoc(typedocOptions))
});

gulp.task('watch', function (cb) {
    watch = true;
    runInSync('build', cb);
});

gulp.task('unit', function (cb) { 
    new karma.Server(karmaOptions, cb).start()
});

gulp.task('e2e', function (cb) {
	return gulp.src(['test/**/*.e2e.js'])
        .pipe($.protractor.protractor(protractorOptions))
        .on('error', function (e) {throw e})
});

gulp.task("default", function (cb) {
    runInSync("unit", "build");
});
