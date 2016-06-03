import {REQUEST_STORIES, STORIES_RECEIVED} from 'mttrs/app/constants/ActionTypes'
import * as API from 'mttrs/app/api/index'

export function requestStories() {
  return {
    type: REQUEST_STORIES
  }
}

export function receiveStories(stories) {
  return {
    type: STORIES_RECEIVED,
    stories: stories
  }
}

export function getStories(options) {
  return dispatch => {
    dispatch(requestStories())
    let query = Object.assign({ popular: true, limit: 10 }, options)

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveStories(response.body))
      })
  }
}
