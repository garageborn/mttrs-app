import { AsyncStorage } from 'react-native'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import captureError from '../common/utils/captureError'
import { parse, stringify } from '../common/utils/Parser'
import { REQUEST_FAVORITE_PUBLISHERS, FAVORITE_PUBLISHERS_RECEIVED } from '../constants/ActionTypes'

export const requestPublishers = () => ({
  type: REQUEST_FAVORITE_PUBLISHERS
})

export const receivePublishers = (favoritePublishers) => ({
  type: FAVORITE_PUBLISHERS_RECEIVED,
  favoritePublishers
})

export function getFavoritePublishers () {
  return (dispatch, getState) => {
    if (isLoaded(getState)) return
    if (isFetching(getState)) return

    dispatch(requestPublishers())
    AsyncStorage.getItem('favoritePublishers', (error, stories) => {
      if (error) return captureError(error)
      return dispatch(receivePublishers(parse(stories) || []))
    })
  }
}

export function addFavoritePublisher (story) {
  return (dispatch, getState) => {
    if (isFavorite(getState, story)) return

    let stories = _uniq(_flatten([favoritePublishers(getState).items, story.id]))
    AsyncStorage.setItem('favoritePublishers', stringify(stories), (error) => {
      if (error) return captureError(error)
      return dispatch(receivePublishers(stories))
    })
  }
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
