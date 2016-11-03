import { AsyncStorage } from 'react-native'
import _ from 'lodash'
import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED } from '../../constants/ActionTypes'

export const requestVisitedStories = () => ({
  type: REQUEST_VISITED_STORIES
})

export const receiveVisitedStories = (visitedStories) => ({
  type: VISITED_STORIES_RECEIVED,
  visitedStories
})

export function getVisitedStories() {
  return (dispatch, getState) => {
    if (isVisitedStoriesLoaded(getState)) return
    if (isVisitedStoriesFetching(getState)) return

    dispatch(requestVisitedStories())
    return AsyncStorage.getItem('visitedStories', (error, stories) => {
      return dispatch(receiveVisitedStories(JSON.parse(stories) || []))
    })
  }
}

export function addVisitedStory(story) {
  return (dispatch, getState) => {
    if (isVisitedStory(getState, story)) return

    let stories = _.uniq(_.flatten([visitedStories(getState).items, story.id]))
    AsyncStorage.setItem('visitedStories', JSON.stringify(stories))
    return dispatch(receiveVisitedStories(stories))
  }
}

function visitedStories(getState) {
  return getState().StorageReducer.visitedStories
}

function isVisitedStoriesFetching(getState) {
  return visitedStories(getState).isFetching
}

function isVisitedStoriesLoaded(getState) {
  return visitedStories(getState).isLoaded
}

function isVisitedStory(getState, story) {
  return visitedStories(getState).items.indexOf(story.id) !== -1
}
