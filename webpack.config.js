/**
 * Created by Aamir on 14/01/2016.
 */

import path from 'path';
import webpack from 'webpack';

const ENV = process.env.NODE_ENV || "development";
const isProd = ENV.toLowerCase() == "production";

let devPlugins = [
	new webpack.optimize.OccurenceOrderPlugin(true),
	new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', minChunks: Infinity }),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(ENV)
		}
	})
];
let prodPlugins = [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(true),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.js',
		chunks: Infinity
	}),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(ENV)
		}
	}),
	new webpack.ProvidePlugin({
		// TypeScript helpers
		'__metadata': 'ts-helper/metadata',
		'__decorate': 'ts-helper/decorate',
		'__awaiter': 'ts-helper/awaiter',
		'__extends': 'ts-helper/extends',
		'__param': 'ts-helper/param',
		'Reflect': 'es7-reflect-metadata/dist/browser'
	}),
	new webpack.optimize.UglifyJsPlugin({
		beautify: false,
		mangle: false,
		comments: false,
		compress: { screw_ie8: true }
	})
];

export default {
	devtool: isProd ? undefined : 'source-map',
	debug: !isProd,
	target: 'web',
	context: root('.'),
	entry: {
		'vendor': './app/vendor.ts',
		'app': './app/app.ts'
	},
	output: {
		path: 'dist/',
		publicPath: 'dist/',
		filename: '[name].js',
		sourceMapFilename: '[name].map'
	},
	resolve: {
		root: root('.'),
		cache: !isProd,
		extensions: ['', '.ts', '.js', '.html']
	},
	module: {
		preLoaders: [
			{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: [/node_modules/, /\.d\.ts$/]
			}
		],
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				query: {
					'compilerOptions': {
						'removeComments': isProd,
						'noEmitHelpers': isProd
					},
					'ignoreDiagnostics': [
						2403, // 2403 -> Subsequent variable declarations
						2420, // 2420 -> Class incorrectly implements interface
						2300, // 2300 -> Duplicate identifier
						2374, // 2374 -> Duplicate number index signature
						2375  // 2375 -> Duplicate string index signature
					]
				},
				exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
			},
			{ test: /\.html$/, loader: 'raw-loader' }
		]
	},
	plugins: isProd ? prodPlugins : devPlugins,
	tslint: {
		emitErrors: !isProd,
		failOnHint: false
	},
	// we need this due to problems with es6-shim
	node: {
		window: 'window',
		Window: 'window',
		global: 'window',
		progress: false,
		crypto: 'empty',
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};

function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}

