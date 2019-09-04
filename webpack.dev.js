const config = require('./webpack.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
	devtool: 'none', // It removes eval, makes it easier to understand
	mode: 'development', // development means: STOP MINIFIED
	plugins: [
		new HtmlWebpackPlugin({  // Also generate a index.html
			filename: 'index.html',
			template: './src/index.html'
		}),
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