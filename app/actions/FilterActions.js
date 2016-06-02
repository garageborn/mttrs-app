import {SET_FILTER} from 'mttrs/app/constants/ActionTypes'

export function setFilter(filter) {
  return (dispatch) => {
    return dispatch({
        type: SET_FILTER,
        filter: filter
      })
  }
}
