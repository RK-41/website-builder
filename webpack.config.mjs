// Config to create a build for a page created with puck editor

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';

// Function to get the directory name from the current module URL
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
	entry: './render-entry.js',
	output: {
		path: path.resolve(__dirname, 'pageBuild'),
		filename: 'render-bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './render-template.html',
			filename: 'render.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'render-styles.css',
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			process: 'process/browser',
		},
	},
};

export default config;
