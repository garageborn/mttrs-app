import { AsyncStorage } from 'react-native'
import captureError from '../common/utils/captureError'
import _parseInt from 'lodash/parseInt'
import prepareArrayParam from '../common/utils/ArrayParam'
import { parse, stringify } from '../common/utils/Parser'
import { AnalyticsActions } from './index'
import { FAVORITE_PUBLISHERS_RECEIVED, REQUEST_FAVORITE_PUBLISHERS } from '../constants/ActionTypes'
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants/Analytics'

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

    AsyncStorage.getItem(key, (error, favorites) => {
      if (error) return captureError(error)
      return dispatch(receivePublishers(parseFromStorage(favorites)))
    })
  }
}

export function addPublisher (publisher) {
  return (dispatch, getState) => {
    const key = storageKey(getState)
    if (!key) return
    if (isFavorite(getState, publisher)) return

    let favorites = addFavorite(getState, publisher.id)
    AsyncStorage.setItem(key, stringify(favorites), (error) => {
      if (error) return captureError(error)
      dispatch(AnalyticsActions.trackEvent(ADD_FAVORITE, publisher.slug))
      return dispatch(receivePublishers(favorites))
    })
  }
}

export function removePublisher (publisher) {
  return (dispatch, getState) => {
    const key = storageKey(getState)
    if (!key) return
    if (!isFavorite(getState, publisher)) return

    let favorites = removeFavorite(getState, publisher.id)
    AsyncStorage.setItem(key, stringify(favorites), (error) => {
      if (error) return captureError(error)
      dispatch(AnalyticsActions.trackEvent(REMOVE_FAVORITE, publisher.slug))
      return dispatch(receivePublishers(favorites))
    })
  }
}

function storageKey (getState) {
  const tenant = getState().TenantReducer.current
  if (!tenant) return
  return `@${tenant.id}:favorite_publishers`
}

function favoritePublishers (getState) {
  return getState().FavoritePublishersReducer
}

function items (getState) {
  return prepare(favoritePublishers(getState).items)
}

function isFetching (getState) {
  return favoritePublishers(getState).isFetching
}

function isLoaded (getState) {
  return favoritePublishers(getState).isLoaded
}

function isFavorite (getState, publisher) {
  const publisherId = _parseInt(publisher.id)
  return items(getState).indexOf(publisherId) !== -1
}

function parseFromStorage (favorites) {
  return prepare(parse(favorites))
}

function prepare (favorites = []) {
  return prepareArrayParam(favorites, [])
}

function addFavorite (getState, publisherId) {
  return prepare([favoritePublishers(getState).items, publisherId])
}

function removeFavorite (getState, id) {
  const publisherId = _parseInt(id)
  let newFavorites = items(getState).filter(id => id !== publisherId)
  return prepare(newFavorites)
}
