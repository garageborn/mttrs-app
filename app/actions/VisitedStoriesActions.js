import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED } from '../constants/ActionTypes'

export const requestStories = () => ({
  type: REQUEST_VISITED_STORIES
})

export const receiveStories = (visitedStories) => ({
  type: VISITED_STORIES_RECEIVED,
  visitedStories
})

export function getStories () {
  return (dispatch, getState) => {
    if (isLoaded(getState)) return
    if (isFetching(getState)) return

    dispatch(requestStories())
    AsyncStorage.getItem('visitedStories', (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receiveStories(parse(stories) || []))
    })
  }
}

export function addStory (story) {
  return (dispatch, getState) => {
    if (isVisited(getState, story)) return

    let stories = _uniq(_flatten([visitedStories(getState).items, story.id]))
    AsyncStorage.setItem('visitedStories', stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveStories(stories))
    })
  }
}

function visitedStories (getState) {
  return getState().VisitedStoriesReducer
}

function isFetching (getState) {
  return visitedStories(getState).isFetching
}

function isLoaded (getState) {
  return visitedStories(getState).isLoaded
}

function isVisited (getState, story) {
  return visitedStories(getState).items.indexOf(story.id) !== -1
}
