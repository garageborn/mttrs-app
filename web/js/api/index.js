import request from 'superagent/lib/client'
import * as ENDPOINTS from 'constants/APIEndpoints'

export function getStories(query={}, callback) {
  request
    .get(ENDPOINTS.STORIES)
    .query(...query)
    .end(callback)
}
