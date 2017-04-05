import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'

import {
  REQUEST_VISITED_STORIES,
  VISITED_STORIES_RECEIVED,
  REQUEST_TENANT,
  TENANT_RECEIVED,
  SHOW_ONBOARDING,
  REQUEST_ONBOARDING,
  REQUEST_NOTIFICATION_STATUS,
  RECEIVE_NOTIFICATION_STATUS
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

export const requestTenant = () => ({
  type: REQUEST_TENANT
})

export const receiveTenant = (tenant) => ({
  type: TENANT_RECEIVED,
  tenant
})

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

export const requestNotificationStatus = () => ({
  type: REQUEST_NOTIFICATION_STATUS
})

export const receiveNotificationStatus = (payload) => ({
  type: RECEIVE_NOTIFICATION_STATUS,
  payload
})

export function getNotificationStatus () {
  return dispatch => {
    dispatch(requestNotificationStatus())
    AsyncStorage.getItem('notificationStatus', (error, data) => {
      if (error) return captureError(error)
      if (!data) return dispatch(setNotificationStatus(true))
      dispatch(receiveNotificationStatus(JSON.parse(data)))
    })
  }
}

export function setNotificationStatus (status) {
  debugger
  return dispatch => {
    AsyncStorage.setItem('notificationStatus', JSON.stringify(status))
    dispatch(receiveNotificationStatus(status))
  }
}
