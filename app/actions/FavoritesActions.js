import { SELECT_FAVORITE_CATEGORY } from '../constants/ActionTypes'
import _result from 'lodash/result'
import { AnalyticsActions } from './index'

const selectFavoriteCategory = (category) => ({
  type: SELECT_FAVORITE_CATEGORY,
  category
})

export function selectCategory (category) {
  return (dispatch) => {
    const categorySlug = _result(category, 'slug')
    dispatch(AnalyticsActions.trackScreen(`/favorites/${categorySlug}`))
    return dispatch(selectFavoriteCategory(category))
  }
}
