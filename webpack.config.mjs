// webpack.config.js or .ts
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default (env = {}) => {
  const domain = process.env.DOMAIN;

  if (!domain) {
    throw new Error(
      'DOMAIN environment variable is required (pass --env DOMAIN=yourdomain)'
    );
  }

  return {
    entry: './render-entry.js',
    output: {
      path: path.resolve(__dirname, 'pageBuild', domain),
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
      new webpack.DefinePlugin({
        'process.env.DOMAIN': JSON.stringify(domain),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        process: 'process/browser',
      },
    },
  };
};
