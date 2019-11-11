const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base.config');

const devConfig = merge(baseConfig, {
	mode: 'development',
	entry: [
    `${baseConfig.externals.paths.src}/index.jsx`,
	],
	output: {
		path: `${baseConfig.externals.paths.build}`,
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/',
	},
	devtool: 'cheap-module-eval-source-map',
	optimization: {},
	devServer: {
		port: 8080,
		overlay: {
			warnings: true,
			errors: true,
		},
		historyApiFallback: true,
		contentBase: baseConfig.externals.paths.src,
		watchContentBase: true,
		disableHostCheck: true,
		stats: {
			modules: false,
			warnings: true,
			chunks: false,
			publicPath: false,
			hash: false,
			version: false,
			timings: true,
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: 'src/index.html',
		}),
	],
});

module.exports = new Promise((resolve) => resolve(devConfig));
