require('dotenv/config');
const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server', 'public');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    clientPath,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /__test__/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              isDevelopment && 'react-refresh/babel'
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  stats: 'minimal',
  devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new webpack.EnvironmentPlugin(['GMAPS_API_KEY']),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean)
};
