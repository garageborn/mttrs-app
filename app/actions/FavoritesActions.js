import _result from 'lodash/result'
import _parseInt from 'lodash/parseInt'
import { SELECT_FAVORITE_PUBLISHER, SELECT_FAVORITE_CATEGORY } from '../constants/ActionTypes'

const selectFavoritePublisher = (publisherId) => ({
  type: SELECT_FAVORITE_PUBLISHER,
  publisherId
})

const selectFavoriteCategory = (categoryId) => ({
  type: SELECT_FAVORITE_CATEGORY,
  categoryId
})

export function selectPublisher (publisher) {
  return (dispatch) => {
    const publisherId = _parseInt(_result(publisher, 'id'))
    return dispatch(selectFavoritePublisher(publisherId))
  }
}

export function selectCategory (category) {
  return (dispatch) => {
    const categoryId = _parseInt(_result(category, 'id'))
    return dispatch(selectFavoriteCategory(categoryId))
  }
}
