import * as ENDPOINTS from '../constants/APIEndpoints'
import request from '../common/utils/APIRequest'

export function getCategories(query={}) {
  return request('GET', ENDPOINTS.CATEGORIES).query(query)
}

export function getCategory(id) {
  return request('GET', ENDPOINTS.CATEGORY(id))
}

export function getPublishers(query={}) {
  return request('GET', ENDPOINTS.PUBLISHERS).query(query)
}

export function getStories(query={}) {
  return request('GET', ENDPOINTS.STORIES).query(query)
}
