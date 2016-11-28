import ApolloClient, { createNetworkInterface } from 'apollo-client'
import * as ENDPOINTS from '../../constants/APIEndpoints'
import Tenant from '../../common/utils/Tenant'

const networkInterface = createNetworkInterface({ uri: ENDPOINTS.GRAPHQL })

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {
        'X-Tenant': Tenant.current
      };
    }
    next();
  }
}]);

export default new ApolloClient({
  networkInterface: networkInterface
})
