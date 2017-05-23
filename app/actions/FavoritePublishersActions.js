import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _compact from 'lodash/compact'
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

function isFetching (getState) {
  return favoritePublishers(getState).isFetching
}

function isLoaded (getState) {
  return favoritePublishers(getState).isLoaded
}

function isFavorite (getState, publisher) {
  return favoritePublishers(getState).items.indexOf(publisher.id) !== -1
}

function parseFromStorage (favorites) {
  return parse(favorites) || []
}

function addFavorite (getState, publisherId) {
  let newFavorites = _flatten([favoritePublishers(getState).items, publisherId])
  return _uniq(_compact(newFavorites))
}

function removeFavorite (getState, publisherId) {
  let newFavorites = favoritePublishers(getState).items.filter(id => id !== publisherId)
  return _uniq(_compact(newFavorites))
}

AsyncStorage.clear()
