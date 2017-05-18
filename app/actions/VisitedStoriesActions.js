import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import _compact from 'lodash/compact'
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
    const key = storageKey(getState)

    if (!key) return
    if (isLoaded(getState)) return
    if (isFetching(getState)) return

    dispatch(requestStories())
    AsyncStorage.getItem(key, (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receiveStories(parseFromStorage(stories)))
    })
  }
}

export function addStory (story) {
  return (dispatch, getState) => {
    const key = storageKey(getState)
    if (!key) return
    if (isVisited(getState, story)) return

    let stories = mergeStories(getState, story.id)
    AsyncStorage.setItem(key, stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveStories(stories))
    })
  }
}

function storageKey (getState) {
  const tenant = getState().TenantReducer.current
  if (!tenant) return
  return `@${tenant.id}:visited_stories`
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

function parseFromStorage (favorites) {
  return parse(favorites) || []
}

function mergeStories (getState, storyId) {
  let newStories = _uniq(_flatten([visitedStories(getState).items, storyId]))
  return _compact(newStories).map(Number)
}
