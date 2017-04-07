import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'

import {
  REQUEST_VISITED_STORIES,
  VISITED_STORIES_RECEIVED,
  SHOW_ONBOARDING,
  REQUEST_ONBOARDING
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
      AsyncStorage.setItem('showOnboarding', stringify(false))
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
