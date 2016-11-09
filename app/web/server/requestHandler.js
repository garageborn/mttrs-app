import React from 'react'
import {match} from 'react-router'
import configureStore from '../config/configureStore.production'
import Routes from '../config/Routes'
import renderEngine from './renderEngine'
import _flattenDeep from 'lodash/flattenDeep'
import Setup from '../config/Setup'
import sentry from './sentry'
const store = configureStore()

let render = (renderProps, response) => {
  try {
    renderEngine(renderProps, store)
      .then((html) => { response.status(200).send(html) })
      .catch(error => { raise(response, error) })
  } catch(error) {
    raise(response, error)
  }
}

let handleRequest = (request, response) => {
  let routes = Routes.all(store)
  match({ routes: routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      raise(response, error)
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      render(renderProps, response)
    } else {
      response.status(404).send('Not found')
    }
  })
}

let requestHandler = (request, response) => {
  Setup.fromRequest(request)
  let promises = _flattenDeep(Routes.fetchData(store))
  Promise.all(promises).then(() => {
    return handleRequest(request, response)
  })
}

let raise = (response, error) => {
  sentry.captureException(error)
  let message = [error.message].concat(error.stack).join("\n\n")
  response.setHeader('content-type', 'text/plain')
  response.status(500).send(message)
}

export default requestHandler
