import request from 'superagent'
import * as ENDPOINTS from 'mttrs/app/constants/APIEndpoints'

export function getCategories(query={}, callback) {
  return request
    .get(ENDPOINTS.CATEGORIES)
    .query(query)
}

export function getCategory(id, callback) {
  return request
    .get(ENDPOINTS.CATEGORY(id))
}

export function getPublishers(query={}, callback) {
  return request
    .get(ENDPOINTS.PUBLISHERS)
    .query(query)
}

export function getStories(query={}) {
  return request
    .get(ENDPOINTS.STORIES)
    .query(query)
}
