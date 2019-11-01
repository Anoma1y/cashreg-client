const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "cache-loader"
				},
				{
					loader: "babel-loader"
				}
			]
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: "cache-loader"
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				},
			]
		},
		{
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
			]
		},
		{
			test: /\.(eot|otf|ttf|woff2?)$/,
			use: 'file-loader',
		},
		{
			test: /\.svg$/,
			use: {
				loader: 'svg-url-loader',
				options: {
					limit: 10 * 1024,
					noquotes: true,
				},
			}
		},
		{
			test: /\.(jpg|png|gif)$/,
			use: [
				{
					loader: "cache-loader"
				},
				{
					loader: 'url-loader',
					options: {
						limit: 10 * 1024,
					}
				},
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			]
		},
	]
};
