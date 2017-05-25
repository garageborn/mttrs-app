import _result from 'lodash/result'
import _parseInt from 'lodash/parseInt'
import { SELECT_FAVORITE_CATEGORY } from '../constants/ActionTypes'

const selectFavoriteCategory = (categoryId) => ({
  type: SELECT_FAVORITE_CATEGORY,
  categoryId
})

export function selectCategory (category) {
  return (dispatch) => {
    const categoryId = _parseInt(_result(category, 'id'))
    return dispatch(selectFavoriteCategory(categoryId))
  }
}
