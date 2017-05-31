import { SELECT_PUBLISHER_CATEGORY } from '../constants/ActionTypes'
import _result from 'lodash/result'
import { AnalyticsActions } from './index'

const selectPublisherCategory = (category) => ({
  type: SELECT_PUBLISHER_CATEGORY,
  category
})

export function selectCategory (publisher, category) {
  return (dispatch) => {
    const publisherSlug = _result(publisher, 'slug')
    const categorySlug = _result(category, 'slug')
    dispatch(AnalyticsActions.trackScreen(`/${publisherSlug}/${categorySlug}`))
    return dispatch(selectPublisherCategory(category))
  }
}
