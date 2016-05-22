import {STORIES_RECEIVED} from 'constants/ActionTypes'
import * as API from 'api/index'

export function receiveStories(stories) {
  return {
    type: STORIES_RECEIVED,
    stories: stories
  }
}

export function getStories(options) {
  return dispatch => {
    let query = Object.assign({ popular: true, limit: 100 }, options)

    API.getStories(query, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveStories(response.body))
    })
  }
}
