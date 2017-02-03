import ApolloClient from 'apollo-client'
import * as ENDPOINTS from '../constants/APIEndpoints'
import Tenant from '../common/utils/Tenant'
import createNetworkInterface from '../common/utils/ApolloNetworkInterface'

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

const networkInterface = createNetworkInterface({ uri: ENDPOINTS.GRAPHQL })

networkInterface.use([
  tenantMiddleware,
  skipCacheMiddleware
])

export default new ApolloClient({ networkInterface: networkInterface })
