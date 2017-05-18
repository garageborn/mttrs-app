import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import { REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED } from '../constants/ActionTypes'

export const requestFavoritePublishers = () => ({
  type: REQUEST_FAVORITE_PUBLISHERS
})

export const receiveVisitedStories = (visitedStories) => ({
  type: FAVORITE_PUBLISHERS_RECEIVED,
  visitedStories
})

export function getFavoritePublishers () {
  return (dispatch, getState) => {
    if (isVisitedStoriesLoaded(getState)) return
    if (isVisitedStoriesFetching(getState)) return

    dispatch(requestFavoritePublishers())
    AsyncStorage.getItem('visitedStories', (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receiveVisitedStories(parse(stories) || []))
    })
  }
}

export function addVisitedStory (story) {
  return (dispatch, getState) => {
    if (isVisitedStory(getState, story)) return

    let stories = _uniq(_flatten([visitedStories(getState).items, story.id]))
    AsyncStorage.setItem('visitedStories', stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveVisitedStories(stories))
    })
  }
}

function favoritePublishers (getState) {
  return getState().StorageReducer.visitedStories
}

function isVisitedStoriesFetching (getState) {
  return favoritePublishers(getState).isFetching
}

function isVisitedStoriesLoaded (getState) {
  return favoritePublishers(getState).isLoaded
}

function isVisitedStory (getState, story) {
  return favoritePublishers(getState).items.indexOf(story.id) !== -1
}
