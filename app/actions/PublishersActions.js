import { PUBLISHERS_RECEIVED } from '../constants/ActionTypes'
import * as API from '../api/index'

export const receivePublishers = (publishers) => ({
  type: PUBLISHERS_RECEIVED,
  publishers
})

export function getPublishers(query) {
  return (dispatch, getState) => {
    if (query === null) query = {}

    return API.getPublishers(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receivePublishers(response.body))
      })
  }
}
