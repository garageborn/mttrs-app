import {RESET_FILTER, SET_FILTER} from 'constants/ActionTypes'

export function resetFilter() {
  return dispatch => {
    dispatch({
      type: RESET_FILTER
    })
  }
}

export function setFilter(filter) {
  return dispatch => {
    dispatch({
      type: SET_FILTER,
      filter: filter
    })
  }
}

