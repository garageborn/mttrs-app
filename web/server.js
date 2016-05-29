import path from 'path'
import express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {renderToString} from 'react-dom/server'
import {Router, match, RouterContext} from 'react-router'
import routes from 'mttrs/app/web/routes'
import configureStore from 'mttrs/app/web/store/configureStore'

const port = (process.env.PORT || 3001)
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static('public/static'))
} else {
  let config = require('./webpack.config')
  let webpack = require('webpack')
  let compiler = webpack(config)
  let webpackDevMiddleware = require('webpack-dev-middleware')
  // let webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }))

  // app.use(webpackHotMiddleware(compiler))
}

let handleRender = (req, res) => {
  const store = configureStore()
  const initialState = store.getState()

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let { query, params } = renderProps;

      const promises = renderProps.components
        .filter((component) => {
          return component.fetchData
        })
        .map((component) => {
          return component.fetchData(store, renderProps.routes[0])
        })

      Promise.all(promises).then(() => {
        const finalState = store.getState()

        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        res.status(200).send(renderFullPage(html, finalState))
      })

    } else {
      res.status(404).send('Not found')
    }
  })
}

let renderFullPage = (html, initialState) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

      <title>Mttrs</title>
      <link href="/static/app.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="mttrs">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/app.js"></script>
    </body>
    </html>
  `
}

app.use(handleRender)


// app.get('*', (_, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

app.listen(3001, 'localhost', (err, result) => {
  if (err) console.log(err)
  console.log(`Listening at localhost ${ port }`)
})
