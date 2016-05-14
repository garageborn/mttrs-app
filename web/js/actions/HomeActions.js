import {HOME_STORIES_RECEIVED} from 'constants/ActionTypes'
import * as API from 'api/index'

export function receiveStories(stories) {
  return {
    type: HOME_STORIES_RECEIVED,
    stories: stories
  }
}

export function getStories() {
  return dispatch => {
    API.getStories({ recent: true }, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveStories(response.body))
    })
  }
}
