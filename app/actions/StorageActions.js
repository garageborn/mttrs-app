import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import Tenant from '../common/utils/Tenant'

import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED,
  REQUEST_NAMESPACE, NAMESPACE_RECEIVED
} from '../constants/ActionTypes'

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

export const requestNamespace = () => ({
  type: REQUEST_NAMESPACE
})

export const receiveNamespace = (namespace) => ({
  type: NAMESPACE_RECEIVED,
  namespace
})

function setTenant(namespace) {
  Tenant.current = namespace
}

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

export function removeFavoritePublisher(publisher) {
  return (dispatch, getState) => {
    if (!isFavoritePublisher(getState, publisher)) return
    let publishers = favoritePublishers(getState).items
    const publisherIndex = publishers.indexOf(publisher.id)
    publishers = removePublisherFromFavorite(publishers, publisherIndex)

    AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers))
    return dispatch(receiveFavoritePublishers(publishers))
  }
}

export function addFavoritePublisher(publisher) {
  return (dispatch, getState) => {
    if (isFavoritePublisher(getState, publisher)) return

    let publishers = _uniq(_flatten([favoritePublishers(getState).items, publisher.id]))
    AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers))
    return dispatch(receiveFavoritePublishers(publishers))
  }
}

export function setCurrentNamespace(namespace) {
  return (dispatch) => {
    setTenant(namespace)
    AsyncStorage.setItem('namespace', namespace)
    return dispatch(receiveNamespace(namespace))
  }
}

export function getCurrentNamespace() {
  return (dispatch) => {
    dispatch(requestNamespace())
    AsyncStorage.getItem('namespace', (error, namespace) => {
      dispatch(this.setCurrentNamespace(namespace || "mttrs"))
    })
  }
}

function removePublisherFromFavorite(publishers, index) {
  return [
    ...publishers.slice(0, index),
    ...publishers.slice(index+1)
  ]
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

function isFavoritePublisher(getState, publisher) {
  return favoritePublishers(getState).items.indexOf(publisher.id) !== -1
}
