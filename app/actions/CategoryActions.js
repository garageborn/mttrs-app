import {OPEN_CATEGORY, CATEGORY_RECEIVED} from 'mttrs/app/constants/ActionTypes'
import * as API from 'mttrs/app/api/index'

export function receiveCategory(category) {
  return {
    type: CATEGORY_RECEIVED,
    category: category
  }
}

export function getCategory(slug = null) {
  return dispatch => {
    if (!slug) return dispatch(receiveCategory(null))

    return API.getCategory(slug)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveCategory(response.body))
      })
  }
}
