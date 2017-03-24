import { HTTPFetchNetworkInterface, createNetworkInterface } from 'apollo-client'
import _mapValues from 'lodash/mapValues'
import { print } from 'graphql-tag/printer'
import queryString from 'query-string'

function printRequest (request) {
  return _mapValues(request, function (val, key) {
    return key === 'query' ? print(val) : val
  })
}

HTTPFetchNetworkInterface.prototype.fetchFromRemoteEndpoint = function (req) {
  const { request, options } = req
  const query = printRequest(request)
  const variables = query.variables || {}

  const headers = Object.assign(
    {},
    { Accept: '*/*', 'Content-Type': 'application/json', 'pragma': 'no-cache', 'cache-control': 'no-cache' },
    options.headers
  )
  const method = options.method || 'POST'
  let uri, body

  if (method === 'POST') {
    uri = this._uri
    body = JSON.stringify(query)
  } else {
    const params = {
      query: query.query.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' '),
      variables: JSON.stringify(variables)
    }

    uri = `${ this._uri }?${ queryString.stringify(params) }`
  }

  return fetch(uri, Object.assign(
    {},
    this._opts,
    { body, method },
    options,
    { headers }
    )
  )
}

export default createNetworkInterface
