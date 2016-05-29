import request from 'superagent'
import * as ENDPOINTS from 'mttrs/app/constants/APIEndpoints'

export function getCategories(query={}, callback) {
  return request
    .get(ENDPOINTS.CATEGORIES)
    .query(query)
    .end(callback)
}

export function getCategory(id, callback) {
  return request
    .get(ENDPOINTS.CATEGORY(id))
    .end(callback)
}

export function getStories(query={}, callback) {
  return request
    .get(ENDPOINTS.STORIES)
    .query(query)
    // .end(callback)
}
