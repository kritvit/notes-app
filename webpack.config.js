
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'src/index.html'),
	filename: './index.html'
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SassLintPlugin = require('sass-lint-webpack');

module.exports = {
	mode: 'production', // development
	entry: [
		'babel-polyfill',
		path.join(__dirname, 'src/index.js'),
		path.join(__dirname, 'src/index.scss')
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env'],
						plugins: ['transform-object-rest-spread']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		htmlWebpackPlugin, 
		new SassLintPlugin(),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
		],
	resolve: {
		alias: {
			App: 		path.resolve(__dirname, 'src/app'),
			Components: path.resolve(__dirname, 'src/app/components'),
			Utils: 		path.resolve(__dirname, 'src/app/utils')
		},
		extensions: ['.js']
	},
	output: {
		path: path.join(__dirname, 'docs'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		port: 9000,
		historyApiFallback: true
	}
};
