require('babel-register')

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var cssnext = require('postcss-cssnext')

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve('index.web.js'),
    path.resolve('app/web/styles/app.sass')
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    publicPath: '/static/',
    filename: 'app.js',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin('app.css', { allChunks: true })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!postcss-loader') },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract('css!sass') },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    alias: {
      mttrs: path.resolve('./')
    },
    extensions: ['', '.js', '.json']
  },
  node: {
    fs: 'empty'
  },
  postcss: function (webpack) {
    return [
      cssnext({ browsers: ['last 2 versions'] })
    ]
  }
}
