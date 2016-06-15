import {CATEGORIES_RECEIVED} from 'mttrs/app/constants/ActionTypes'
import * as API from 'mttrs/app/api/index'

export function receiveCategories(categories) {
  return {
    type: CATEGORIES_RECEIVED,
    categories: categories
  }
}

export function getCategories() {
  return (dispatch, getState) => {
    if (getState().CategoriesReducers.categories.length) return

    return API.getCategories()
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveCategories(response.body))
      })
  }
}
