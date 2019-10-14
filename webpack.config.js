const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: "production",
	entry: './src/index.ts',

	output: {
    // filename: '[name].[chunkhash].js',
    filename: 'floodgate.js',
    // path: path.resolve(__dirname, 'webpackdist')
    path: path.resolve('./library')
	},

	// plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			}
		]
	},

	optimization: {
		
	},

	devServer: {
		open: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
