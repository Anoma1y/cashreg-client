const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const modules = require('./modules');

const paths = {
	src: path.join(process.cwd(), 'src'),
	build: path.join(process.cwd(), 'build'),
};

module.exports = {
	externals: {
		paths,
	},
	module: modules,
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.jsx', '.react.js'],
		mainFields: ['browser', 'jsnext:main', 'main'],
	},
	plugins: [
		new Dotenv(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
};
