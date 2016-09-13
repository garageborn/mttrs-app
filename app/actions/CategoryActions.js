import { CATEGORIES_RECEIVED } from '../constants/ActionTypes'
import * as API from '../api/index'

export const receiveCategories = (categories) => ({
  type: CATEGORIES_RECEIVED,
  categories
})

export function getCategories () {
  return (dispatch, getState) => {
    if (getState().CategoriesReducers.categories.length) return

    return API.getCategories()
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveCategories(response.body))
      })
  }
}
