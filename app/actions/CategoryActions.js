import {OPEN_CATEGORY, CATEGORY_RECEIVED} from 'constants/ActionTypes'
import * as API from 'api/index'

export function receiveCategory(category) {
  return {
    type: CATEGORY_RECEIVED,
    category: category
  }
}

export function getCategory(slug = null) {
  return dispatch => {
    if (!slug) return dispatch(receiveCategory(null))

    API.getCategory(slug, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveCategory(response.body))
    })
  }
}
