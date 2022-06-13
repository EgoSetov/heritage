import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'build.[chunkhash].js'
	},
	devServer: {
		port: 7000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html')
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}