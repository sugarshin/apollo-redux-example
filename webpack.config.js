const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js'],
  },
  plugins: [
    new HtmlPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: process.env.PORT || '8003',
  },
}
