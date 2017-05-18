import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import { FAVORITE_PUBLISHERS_RECEIVED, REQUEST_FAVORITE_PUBLISHERS } from '../constants/ActionTypes'

export const requestPublishers = () => ({
  type: REQUEST_FAVORITE_PUBLISHERS
})

export const receivePublishers = (favoritePublishers) => ({
  type: FAVORITE_PUBLISHERS_RECEIVED,
  favoritePublishers
})

export function getPublishers () {
  return (dispatch, getState) => {
    const key = storageKey(getState)

    if (!key) return
    if (isLoaded(getState)) return
    if (isFetching(getState)) return

    dispatch(requestPublishers())

    AsyncStorage.getItem(key, (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receivePublishers(parse(stories) || []))
    })
  }
}

export function addPublisher (story) {
  return (dispatch, getState) => {
    const key = storageKey(getState)
    if (!key) return
    if (isFavorite(getState, story)) return

    let stories = _uniq(_flatten([favoritePublishers(getState).items, story.id]))
    AsyncStorage.setItem(key, stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receivePublishers(stories))
    })
  }
}

function storageKey (getState) {
  const tenant = getState().TenantReducer.current
  if (!tenant) return
  return `@${ tenant.id }:favorite_publishers`
}

function favoritePublishers (getState) {
  return getState().FavoritePublishersReducer
}

function isFetching (getState) {
  return favoritePublishers(getState).isFetching
}

function isLoaded (getState) {
  return favoritePublishers(getState).isLoaded
}

function isFavorite (getState, story) {
  return favoritePublishers(getState).items.indexOf(story.id) !== -1
}
