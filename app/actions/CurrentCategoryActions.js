import {CURRENT_CATEGORY_RECEIVED} from '../constants/ActionTypes'
import * as API from '../api/index'

export function receiveCategory(category) {
  return {
    type: CURRENT_CATEGORY_RECEIVED,
    category: category
  }
}

export function getCategory(slug = null) {
  return (dispatch, getState) => {
    if (!slug) return dispatch(receiveCategory(null))
    if (isCurrentCategory(getState, slug)) return

    return API.getCategory(slug)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveCategory(response.body))
      })
  }
}

function isCurrentCategory(getState, slug) {
  let category = getState().CurrentCategoryReducers.category
  if (!category) return false
  return category.slug === slug
}
