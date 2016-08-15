import React from 'react'
import {match} from 'react-router'
import configureStore from '../config/configureStore.production'
import Routes from '../config/Routes'
import renderEngine from './renderEngine'
import _ from 'lodash'
const store = configureStore()

let handleRequest = (req, res) => {
  let routes = Routes.all(store)
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      renderEngine(store, renderProps)
        .then((html) => { res.status(200).send(html) })
        .catch(exception => {
          console.log(exception)
          res.status(500).send(exception.message)
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}

let requestHandler = (req, res) => {
  let promises = _.flattenDeep(Routes.fetchData(store))
  Promise.all(promises).then(() => {
    return handleRequest(req, res)
  })
}

export default requestHandler
