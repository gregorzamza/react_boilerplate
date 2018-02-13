var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');
var SRC_DIR = path.resolve(__dirname, './src');

const ShakePlugin = require('webpack-common-shake').Plugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins:[ 
    new ShakePlugin(),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: SRC_DIR + '/index.html',
    }),
  ],
  module : {
    rules: [
      { 
        enforce: "pre",
        test : /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          emitWarning: true,
        }
      },
      {
        test : /\.jsx?$/,
        include : SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },      
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.less$/,
        loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],    
  },
};

module.exports = config;