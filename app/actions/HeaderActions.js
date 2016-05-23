import {HEADER_CATEGORIES_RECEIVED} from 'constants/ActionTypes'
import * as API from 'api/index'

export function receiveCategories(categories) {
  return {
    type: HEADER_CATEGORIES_RECEIVED,
    categories: categories
  }
}

export function getCategories() {
  return dispatch => {
    API.getCategories({}, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveCategories(response.body))
    })
  }
}
