import React from 'react'
import {Provider} from 'react-redux'
import _ from 'lodash'
import {renderToString} from 'react-dom/server'
import {Router, RouterContext} from 'react-router'
import path from 'path'
import jade from 'jade'

const templatePath = path.resolve(__dirname, 'templates/index.jade')

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

let defaultData = {
  MTTRS_FRONTEND_SENTRY_PUBLIC_DSN: process.env.MTTRS_FRONTEND_SENTRY_PUBLIC_DSN
}

let renderFullPage = (html, state) => {
  let initialState = JSON.stringify(state).replace(/\//g, '\\/') || 'null'
  let data = Object.assign({}, defaultData, { html: html, initialState: initialState })
  return jade.renderFile(templatePath, data)
}

export default handleRender
