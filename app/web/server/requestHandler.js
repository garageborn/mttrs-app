import React from 'react'
import {match} from 'react-router'
import configureStore from 'mttrs/app/web/store/configureStore'
import Routes from 'mttrs/app/web/config/Routes'
import renderEngine from 'mttrs/app/web/server/renderEngine'
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
      renderEngine(store, renderProps).then((html) => {
        res.status(200).send(html)
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
