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
    let query = { recent: true, today: true }
    API.getStories(query, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveStories(response.body))
    })
  }
}
