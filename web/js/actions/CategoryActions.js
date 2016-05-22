import {OPEN_CATEGORY, CATEGORY_RECEIVED, RESET_CATEGORY} from 'constants/ActionTypes'
import * as API from 'api/index'
import {push} from 'react-router-redux'

export function receiveCategory(category) {
  return {
    type: CATEGORY_RECEIVED,
    category: category
  }
}

export function openCategory(category) {
  return dispatch => {
    let path = `/categories/${ category.slug }`
    dispatch(push(path))
  }
}

export function resetCategory() {
  return dispatch => {
    dispatch({
      type: RESET_CATEGORY
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
