import {HOME_STORIES_RECEIVED, OPEN_HOME} from 'constants/ActionTypes'
import * as API from 'api/index'
import {push} from 'react-router-redux'

export function receiveStories(stories) {
  return {
    type: HOME_STORIES_RECEIVED,
    stories: stories
  }
}

export function getStories(filter) {
  return dispatch => {
    let query = { limit: 100 }
    if (query) query[filter] = true

    API.getStories(query, (error, response) => {
      if (error || !response.ok) return
      dispatch(receiveStories(response.body))
    })
  }
}

export function openHome() {
  return dispatch => {
    dispatch(push('/'))
  }
}
