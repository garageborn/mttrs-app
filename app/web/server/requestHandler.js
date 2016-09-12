import React from 'react'
import {match} from 'react-router'
import configureStore from '../config/configureStore.production'
import Routes from '../config/Routes'
import renderEngine from './renderEngine'
import _ from 'lodash'
import Setup from './setup'
const store = configureStore()

let render = (renderProps, response) => {
  try {
    renderEngine(renderProps, store)
      .then((html) => {
        response.status(200).send(html)
      })
      .catch(exception => {
        response.status(500).send(exception.message)
      })
  } catch(exception) {
    response.status(500).send(exception.message)
  }
}

let handleRequest = (request, response) => {
  let routes = Routes.all(store)
  match({ routes: routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message)
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
  Setup.run(request)
  let promises = _.flattenDeep(Routes.fetchData(store))
  Promise.all(promises).then(() => {
    return handleRequest(request, response)
  })
}

export default requestHandler
