import { SELECT_CATEGORY_TAG } from '../constants/ActionTypes'
import _result from 'lodash/result'
import { AnalyticsActions } from './index'

const selectCategoryTag = (category, tag) => ({
  type: SELECT_CATEGORY_TAG,
  category,
  tag
})

export function selectTag (category, tag) {
  return (dispatch) => {
    const categorySlug = _result(category, 'slug')
    const tagSlug = _result(tag, 'slug')
    dispatch(AnalyticsActions.trackScreen(`/${categorySlug}/${tagSlug}`))
    return dispatch(selectCategoryTag(category, tag))
  }
}
