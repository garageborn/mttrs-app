var path = require('path')
var express = require('express')
var port = (process.env.PORT || 3001)
var app = express()

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('public/static'))
} else {
  var config = require('./webpack.config')
  var webpack = require('webpack')
  var compiler = webpack(config)
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }))

  app.use(webpackHotMiddleware(compiler))
}

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3001, 'localhost', function (err, result) {
  if (err) console.log(err)
  console.log('Listening at localhost '+ port)
})
