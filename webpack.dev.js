const config = require('./webpack.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
	devtool: 'none', // It removes eval, makes it easier to understand
	mode: 'development', // development means: STOP MINIFIED
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'services.html',
			template: './src/services.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'contact.html',
			template: './src/contact.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader", // 3. Inject styles into DOM
					"css-loader", // 2. Turns css into js
					"sass-loader" // 1. Turns sass into css
				]
			}
		]
	}
});