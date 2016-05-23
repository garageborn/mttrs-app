var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

console.log(path.resolve('index.web.js'))
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve('index.web.js'),
    path.resolve('app/web/styles/app.sass')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
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
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract('css!sass') },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    alias: {
      actions: path.resolve('app/actions'),
      api: path.resolve('app/api'),
      assets: path.resolve('app/web/assets'),
      components: path.resolve('app/web/components'),
      constants: path.resolve('app/constants'),
      containers: path.resolve('app/web/containers'),
      reducers: path.resolve('app/reducers'),
      store: path.resolve('app/web/store'),
      utils: path.resolve('app/web/utils')
    },
    extensions: ['', '.js', '.json']
  }
}
