import { CURRENT_PUBLISHER_RECEIVED, CLEAR_CURRENT_PUBLISHER } from '../constants/ActionTypes'
import * as API from '../api/index'

export const receivePublisher = (publisher) => ({
  type: CURRENT_PUBLISHER_RECEIVED,
  publisher
})

export const clearPublisher = () => ({
  type: CLEAR_CURRENT_PUBLISHER
})

export function getPublisher(slug = null) {
  return (dispatch, getState) => {
    if (!slug) return clear()
    if (isCurrentPublisher(getState, slug)) return

    let statePublisher = findPublisher(getState, slug)
    if (statePublisher) return dispatch(receivePublisher(statePublisher))

    return API.getPublisher(slug)
      .then((response) => {
        if (!response.ok) return
        dispatch(receivePublisher(response.body))
      })
  }
}

export function clear() {
   return (dispatch) => { dispatch(clearPublisher()) }
}

function findPublisher(getState, slug) {
  return getState().PublishersReducers.publishers.find(publisher => publisher.slug === slug)
}

function isCurrentPublisher(getState, slug) {
  let publisher = getState().CurrentPublisherReducer.publisher
  return publisher && publisher.slug === slug
}
