'use strict';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',

  entry: './src/app.ts',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              useBabel: true,
              babelCore: '@babel/core'
            },
          },
        ],
      },
      {
        test: [/\.vert$/, /\.frag$/],
        loader: 'raw-loader'
      },
      {
        test: /assets(\/|\\)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      "assets": path.resolve(__dirname, 'assets/'),
      "phaser": "phaser/dist/phaser.js"
    },

    extensions: [
      '.js',
      '.ts',
      '.json'
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'templates/index.ejs')
    }),

    // Perform type checking and linting in a separate process to speed up compilation
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: './tsconfig.json',
      tslint: './tslint.json'
    }),
  ],

  // Dev server settings.
  devServer: {
    contentBase: './build',
    https: false
  }
};
