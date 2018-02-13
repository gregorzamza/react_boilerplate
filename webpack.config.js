var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');
var SRC_DIR = path.resolve(__dirname, './src');

const ShakePlugin = require('webpack-common-shake').Plugin;

var config = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins:[ new ShakePlugin() ],
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
    ],    
  },
};

module.exports = config;