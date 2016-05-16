import {SET_FILTER} from 'constants/ActionTypes'

export function setFilter(filter) {
  return dispatch => {
    dispatch({
      type: SET_FILTER,
      filter: filter
    })
  }
}
