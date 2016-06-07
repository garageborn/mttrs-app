import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import requestHandler from 'mttrs/app/web/server/requestHandler'

const port = (process.env.PORT || 4001)
const app = express()
const publicPath = path.resolve('web/public')

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('public/static'))
} else {
  let config = require('./webpack.config')
  let webpack = require('webpack')
  let compiler = webpack(config)
  let webpackDevMiddleware = require('webpack-dev-middleware')
  let webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }))

  app.use(webpackHotMiddleware(compiler))
}

app.use(favicon(publicPath + '/favicon.ico'))
app.use(requestHandler)

app.listen(port, 'localhost', (err, result) => {
  if (err) console.log(err)
  console.log(`Listening at localhost ${ port }`)
})
