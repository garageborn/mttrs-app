import { CURRENT_CATEGORY_RECEIVED } from '../constants/ActionTypes'
import * as API from '../api/index'

export const receiveCategory = (category) => ({
  type: CURRENT_CATEGORY_RECEIVED,
  category
})

export function getCategory(slug = null) {
  return (dispatch, getState) => {
    if (!slug) return dispatch(receiveCategory(null))
    if (isCurrentCategory(getState, slug)) return

    let stateCategory = findCategory(getState, slug)
    if (stateCategory) return dispatch(receiveCategory(stateCategory))

    return API.getCategory(slug)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveCategory(response.body))
      })
  }
}

function findCategory(getState, slug) {
  return getState().CategoriesReducers.categories.find(category => category.slug === slug)
}

function isCurrentCategory(getState, slug) {
  let category = getState().CurrentCategoryReducer.category
  return category && category.slug === slug
}
