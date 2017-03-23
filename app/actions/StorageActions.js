import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'

import { REQUEST_VISITED_STORIES, VISITED_STORIES_RECEIVED,
  REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED,
  REQUEST_TENANT, TENANT_RECEIVED, SHOW_ONBOARDING, REQUEST_ONBOARDING
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
    AsyncStorage.getItem('visitedStories', (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receiveVisitedStories(JSON.parse(stories) || []))
    })
  }
}

export function addVisitedStory (story) {
  return (dispatch, getState) => {
    if (isVisitedStory(getState, story)) return

    let stories = _uniq(_flatten([visitedStories(getState).items, story.id]))
    AsyncStorage.setItem('visitedStories', JSON.stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveVisitedStories(stories))
    })
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

    AsyncStorage.getItem('favoritePublishers', (error, publishers) => {
      if (error) return captureError(error)
      return dispatch(receiveFavoritePublishers(JSON.parse(publishers) || []))
    })
  }
}

export function removeFavoritePublisher (publisher) {
  return (dispatch, getState) => {
    if (!isFavoritePublisher(getState, publisher)) return
    let publishers = favoritePublishers(getState).items
    const publisherIndex = publishers.indexOf(publisher.id)
    publishers = removePublisherFromFavorite(publishers, publisherIndex)

    AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveFavoritePublishers(publishers))
    })
  }
}

export function addFavoritePublisher (publisher) {
  return (dispatch, getState) => {
    if (isFavoritePublisher(getState, publisher)) return

    let publishers = _uniq(_flatten([favoritePublishers(getState).items, publisher.id]))

    AsyncStorage.setItem('favoritePublishers', JSON.stringify(publishers), (error) => {
      if (error) return captureError(error)
      return dispatch(receiveFavoritePublishers(publishers))
    })
  }
}

export function setCurrentTenant (tenant) {
  return (dispatch) => {
    Tenant.current = tenant
    AsyncStorage.setItem('tenant', tenant, (error) => {
      if (error) return captureError(error)
      return dispatch(receiveTenant(tenant))
    })
  }
}

export function getCurrentTenant (locale) {
  let localeTenant = 'mttrs_us'
  if (locale === 'pt-BR') localeTenant = 'mttrs_br'
  return (dispatch) => {
    dispatch(requestTenant())
    AsyncStorage.getItem('tenant', (error, tenant) => {
      dispatch(this.setCurrentTenant(tenant || localeTenant))
    })
  }
}

export const requestOnboarding = () => ({
  type: REQUEST_ONBOARDING
})

export const showOnboarding = show => ({
  type: SHOW_ONBOARDING,
  show
})

export function closeOnboarding () {
  return dispatch => {
    dispatch(this.showOnboarding(false))
    try {
      AsyncStorage.setItem('showOnboarding', JSON.stringify(false))
    } catch (error) {
      captureError(error)
    }
  }
}

export function getOnboardingStatus () {
  return dispatch => {
    dispatch(this.requestOnboarding())
    AsyncStorage.getItem('showOnboarding', (error, data) => {
      if (error) captureError(error)

      if (data === null) {
        dispatch(this.showOnboarding(true))
      } else {
        dispatch(this.showOnboarding(false))
      }
    })
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
