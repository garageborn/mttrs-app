import request from 'superagent/lib/client'
import * as ENDPOINTS from 'constants/APIEndpoints'

export function getCategories(query={}, callback) {
  request
    .get(ENDPOINTS.CATEGORIES)
    .query(query)
    .end(callback)
}

export function getCategory(id, callback) {
  request
    .get(ENDPOINTS.CATEGORY(id))
    .end(callback)
}

export function getStories(query={}, callback) {
  request
    .get(ENDPOINTS.STORIES)
    .query(query)
    .end(callback)
}
