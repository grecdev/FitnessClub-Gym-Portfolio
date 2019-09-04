const config = require('./webpack.config');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(config, {
	devtool: 'none', // It removes eval, makes it easier to understand
	mode: 'production', // development means: STOP MINIFIED
	output: { // Output folder
		path: path.resolve(__dirname, 'dist'), // __dirname = current directory, and a folder called dist
		filename: 'assets/js/app.[contentHash].js', // Create app.js in dist folder [name].[contentHash].js
		// publicPath: './'
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(), 
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				}
			}),
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin( {
			filename: "assets/css/style.[contentHash].css" // where to save the minified css file
		}),
		new CopyPlugin([
			{ 
				from: './src/assets', 
				to: './assets',
				ignore: ['*.txt', '*.svg', '*.jpeg', '*.gif', '*.jpg', '*.JPG', '*.png', '*.PNG', '*.js', '*.scss']
			},
    ])
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
				],
			},
		]	
	}
});
