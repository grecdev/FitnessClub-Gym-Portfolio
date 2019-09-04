module.exports = {
	devtool: 'none',
	entry: {
		main: ['@babel/polyfill', './src/assets/js/app.js'], // Which file we want to use to be our source file, entry point, that have modern JS
	},
	module: {
		rules: [
			{ // where we define our loaders (e.g: babel loader)
			test: /\.js?$/, // Look at all .js files
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: { // Where we define our presets
				presets: ['@babel/preset-env']
				}
			},
			{
				test:  /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/i,
				use: {
					loader: "file-loader",
					options: {
						name: "assets/imgs/[name].[hash].[ext]",
					}
				}
			},
		]
	}
};