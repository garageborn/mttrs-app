import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'

import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED } from '../../constants/ActionTypes'

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

    let stories = _uniq(_flatten([visitedStories(getState).items, story.id]))
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

export const requestFavoritePublishers = () => ({
  type: REQUEST_FAVORITE_PUBLISHERS
})

export const receiveFavoritePublishers = (favoritePublishers) => ({
  type: FAVORITE_PUBLISHERS_RECEIVED,
  favoritePublishers
})

export function getFavoritePublishers() {
  return (dispatch, getState) => {
    if (isFavoritePublishersLoaded(getState)) return
    if (isFavoritePublishersFetching(getState)) return

    dispatch(requestFavoritePublishers())
    return AsyncStorage.getItem('favoritePublishers', (error, publishers) => {
      return dispatch(receiveFavoritePublishers(JSON.parse(publishers) || []))
    })
  }
}

function isFavoritePublishersFetching(getState) {
  return favoritePublishers(getState).isFetching
}

function isFavoritePublishersLoaded(getState) {
  return favoritePublishers(getState).isLoaded
}

function favoritePublishers(getState) {
  return getState().StorageReducer.favoritePublishers
}
