import ApolloClient, { createNetworkInterface } from 'apollo-client'
import * as ENDPOINTS from '../../constants/APIEndpoints'

export default new ApolloClient({
  networkInterface: createNetworkInterface(ENDPOINTS.GRAPHQL),
})
