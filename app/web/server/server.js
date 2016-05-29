import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

import {match} from 'react-router'
import routes from 'mttrs/app/web/routes'
import renderEngine from './renderEngine'

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

let handleRender = (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      renderEngine(renderProps).then((html) => { res.status(200).send(html) })
    } else {
      res.status(404).send('Not found')
    }
  })
}

app.use(favicon(publicPath + '/favicon.ico'))
app.use(handleRender)

app.listen(port, 'localhost', (err, result) => {
  if (err) console.log(err)
  console.log(`Listening at localhost ${ port }`)
})
