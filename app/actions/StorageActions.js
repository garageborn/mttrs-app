import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'

import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED,
  REQUEST_TENANT, TENANT_RECEIVED
} from '../constants/ActionTypes'

export const requestVisitedStories = () => ({
  type: REQUEST_VISITED_STORIES
})

export const receiveVisitedStories = (visitedStories) => ({
  type: VISITED_STORIES_RECEIVED,
  visitedStories
})

export function getVisitedStories () {
  return (dispatch, getState) => {
    if (isVisitedStoriesLoaded(getState)) return
    if (isVisitedStoriesFetching(getState)) return

    dispatch(requestVisitedStories())
    try {
      const stories = AsyncStorage.getItem('visitedStories')
      return dispatch(receiveVisitedStories(JSON.parse(stories) || []))
    } catch (error) {
      captureError(error)
    }
  }
}

export function addVisitedStory (story) {
  return (dispatch, getState) => {
    if (isVisitedStory(getState, story)) return

    let stories = _uniq(_flatten([visitedStories(getState).items, story.id]))
    try {
      AsyncStorage.setItem('visitedStories', JSON.stringify(stories))
      return dispatch(receiveVisitedStories(stories))
    } catch (error) {
      captureError(error)
    }
  }
}

function visitedStories (getState) {
  return getState().StorageReducer.visitedStories
}

function isVisitedStoriesFetching (getState) {
  return visitedStories(getState).isFetching
}

function isVisitedStoriesLoaded (getState) {
  return visitedStories(getState).isLoaded
}

function isVisitedStory (getState, story) {
  return visitedStories(getState).items.indexOf(story.id) !== -1
}

export const requestFavoritePublishers = () => ({
  type: REQUEST_FAVORITE_PUBLISHERS
})

export const receiveFavoritePublishers = (favoritePublishers) => ({
  type: FAVORITE_PUBLISHERS_RECEIVED,
  favoritePublishers
})

export const requestTenant = () => ({
  type: REQUEST_TENANT
})

export const receiveTenant = (tenant) => ({
  type: TENANT_RECEIVED,
  tenant
})

export function getFavoritePublishers () {
  return (dispatch, getState) => {
    if (isFavoritePublishersLoaded(getState)) return
    if (isFavoritePublishersFetching(getState)) return
    dispatch(requestFavoritePublishers())
    try {
      const publishers = AsyncStorage.getItem('favoritePublishers')
      return dispatch(receiveFavoritePublishers(JSON.parse(publishers) || []))
    } catch (error) {
      captureError(error)
    }
  }
}

export function removeFavoritePublisher (publisher) {
  return (dispatch, getState) => {
    if (!isFavoritePublisher(getState, publisher)) return
    let publishers = favoritePublishers(getState).items
    const publisherIndex = publishers.indexOf(publisher.id)
    publishers = removePublisherFromFavorite(publishers, publisherIndex)

    try {
      AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers))
      return dispatch(receiveFavoritePublishers(publishers))
    } catch (error) {
      captureError(error)
    }
  }
}

export function addFavoritePublisher (publisher) {
  return (dispatch, getState) => {
    if (isFavoritePublisher(getState, publisher)) return

    let publishers = _uniq(_flatten([favoritePublishers(getState).items, publisher.id]))
    try {
      AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers))
      return dispatch(receiveFavoritePublishers(publishers))
    } catch (error) {
      captureError(error)
    }
  }
}

export function setCurrentTenant (tenant) {
  return (dispatch) => {
    Tenant.current = tenant
    try {
      AsyncStorage.setItem('tenant', tenant)
      return dispatch(receiveTenant(tenant))
    } catch (error) {
      captureError(error)
    }
  }
}

export function getCurrentTenant (locale) {
  // TEMPORARY
  // let localeTenant = 'mttrs_us'
  // if (locale === 'pt-BR') localeTenant = 'mttrs_br'
  return (dispatch) => {
    dispatch(this.setCurrentTenant('mttrs_br'))
    // TEMPORARY
    // dispatch(requestTenant())
    // AsyncStorage.getItem('tenant', (error, tenant) => {
    //   dispatch(this.setCurrentTenant(tenant || localeTenant))
    // })
  }
}

function removePublisherFromFavorite (publishers, index) {
  return [
    ...publishers.slice(0, index),
    ...publishers.slice(index + 1)
  ]
}

function isFavoritePublishersFetching (getState) {
  return favoritePublishers(getState).isFetching
}

function isFavoritePublishersLoaded (getState) {
  return favoritePublishers(getState).isLoaded
}

function favoritePublishers (getState) {
  return getState().StorageReducer.favoritePublishers
}

function isFavoritePublisher (getState, publisher) {
  return favoritePublishers(getState).items.indexOf(publisher.id) !== -1
}
