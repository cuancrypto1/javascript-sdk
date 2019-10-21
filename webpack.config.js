const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: "production",
	entry: './src/index.ts',

	output: {
    filename: 'floodgateio.js',
    path: path.resolve('./lib'),
    library: 'floodgate'
  },
  
	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
      },
      // // {
      // //   test: /.(js|jsx)?$/,
      // //   loader: 'babel-loader',
      // //   exclude: [path.resolve(__dirname, 'src')],
      // //   // exclude: [/node_modules/, path.resolve(__dirname, 'src')],
      // //   // include: [/node_modules\\ky/]
      // //   // options: {
      // //   //   plugins: ['@babel/plugin-proposal-object-rest-spread']
      // //   // }
      // // },
      /**
       * 
       * include: [
          path.resolve(__dirname, 'app/styles'),
          path.resolve(__dirname, 'vendor/styles')
        ]
       */
      // {
      //   // test: /\.jsx?$/,
      //   test: /.(js|jsx)?$/,
      //   loader: 'babel-loader',
      //   // exclude: [/node_modules/],
      //   options: {
      //     plugins: ['@babel/plugin-proposal-object-rest-spread']
      //   }
      // },
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
