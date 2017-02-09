import ApolloClient from 'apollo-client'
import * as ENDPOINTS from '../constants/APIEndpoints'
import Tenant from '../common/utils/Tenant'
import createNetworkInterface from '../common/utils/ApolloNetworkInterface'
import captureError from '../common/utils/captureError'

const tenantMiddleware = {
  applyMiddleware: (req, next) => {
    if (!req.options.headers) req.options.headers = {}
    req.options.headers['X-Tenant'] = Tenant.current
    next()
  }
}

const skipCacheMiddleware = {
  applyMiddleware: (req, next) => {
    let hasMutation = req.request.query.definitions.find((definition) => {
      return definition.operation === 'mutation'
    })

    if (hasMutation) {
      req.options.method = 'POST'
    } else {
      req.options.method = 'GET'
    }

    next()
  }
}

const errorHandler = {
  applyAfterware: ({ response }, next) => {
    if (!response.ok) {
      next()
    } else {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          captureError('GraphQL Errors:', errors.map(e => e.message))
        }
      })
    }

    next()
  }
}

const networkInterface = createNetworkInterface({ uri: ENDPOINTS.GRAPHQL })

networkInterface.use([
  tenantMiddleware,
  skipCacheMiddleware
]).useAfter([
  errorHandler
])

const apolloClient = new ApolloClient({
  networkInterface: networkInterface,
  queryDeduplication: true
})

export default apolloClient
