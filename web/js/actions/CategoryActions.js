import {OPEN_CATEGORY, CATEGORY_RECEIVED, CATEGORY_STORIES_RECEIVED} from 'constants/ActionTypes'
import * as API from 'api/index'
import {push} from 'react-router-redux'

export function receiveCategory(category) {
  return {
    type: CATEGORY_RECEIVED,
    category: category
  }
}

export function receiveStories(stories, sorting) {
  return {
    type: CATEGORY_STORIES_RECEIVED,
    stories: stories
  }
}

export function openCategory(category) {
  return dispatch => {
    let path = `/categories/${ category.slug }`
    dispatch(push(path))
  }
}

export function getStories(categorySlug, filter) {
  return dispatch => {
    let query = { category_slug: categorySlug, popular: true, limit: 100 }
    query[filter] = true

    API.getStories(query, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveStories(response.body, filter))
    })
  }
}

export function getCategory(slug) {
  return dispatch => {
    API.getCategory(slug, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveCategory(response.body))
    })
  }
}
