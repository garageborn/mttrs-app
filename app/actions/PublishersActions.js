import {PUBLISHERS_RECEIVED} from '../constants/ActionTypes'
import * as API from '../api/index'

export const receivePublishers = (publishers) => ({
  type: PUBLISHERS_RECEIVED,
  publishers
})

export function getPublishers() {
  return (dispatch, getState) => {
    if (getState().PublishersReducers.publishers.length) return

    return API.getPublishers()
      .then((response) => {
        if (!response.ok) return
        dispatch(receivePublishers(response.body))
      })
  }
}
