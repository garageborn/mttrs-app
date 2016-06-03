import React from 'react'
import {Provider} from 'react-redux'
import _ from 'lodash'
import {renderToString} from 'react-dom/server'
import {Router, RouterContext} from 'react-router'

let handleRender = (store, renderProps) => {
  let promises = mapPromises(store, renderProps)

  return Promise.all(promises).then(() => {
    return render(store, renderProps)
  })
}

let mapPromises = (store, renderProps) => {
  let { components, params, routes } = renderProps
  let promises = components
    .filter((component) => {
      return component.fetchData
    })
    .map((component) => {
      let options = { dispatch: store.dispatch, params: params, route: routes[0] }
      return component.fetchData(options)
    })
  return _.flattenDeep(promises)
}

let render = (store, renderProps) => {
  const finalState = store.getState()
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )
  return renderFullPage(html, finalState)
}

let renderFullPage = (html, state) => {
  let initialState = JSON.stringify(state).replace(/\//g, '\\/') || 'null'
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'>
      <title>Mttrs</title>
      <link href='/static/app.css' rel='stylesheet' type='text/css'/>
    </head>
    <body>
      <div id='mttrs'>${ html }</div>
      <div id='dev-tools'></div>
      <script type='text/javascript'>
        window.__INITIAL_STATE__ = ${ initialState }
      </script>
      <script src='/static/app.js'></script>
    </body>
    </html>
  `
}

export default handleRender
