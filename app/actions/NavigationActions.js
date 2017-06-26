import { NavigationActions } from 'react-navigation'
import _result from 'lodash/result'
import { AnalyticsActions, UIActions } from './index'

// AppNavigator
export function root () {
  return dispatch => dispatch(favorites())
}

export function favorites () {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'favorites' }))
  }
}

export function popular () {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'popular' }))
  }
}

export function link (slug, renderOptions) {
  return dispatch => {
    const params = { slug, renderOptions }
    dispatch(NavigationActions.navigate({ routeName: 'link', params }))
  }
}

export function publisher (publisher) {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'publisher', params: { publisher } }))
  }
}

export function settings () {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'settings' }))
  }
}

export function favoritePublishers () {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'favoritePublishers'}))
  }
}

export function addFavorites () {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'addFavorites'}))
  }
}

export function countrySelector () {
  return dispatch => {
    dispatch(NavigationActions.navigate({routeName: 'countrySelector'}))
  }
}

export function back () {
  return dispatch => dispatch(NavigationActions.back())
}

// Modals
export function storyLinks (story, content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/story-links`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function socialCount (story, content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/social-count`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function storyDialog (story, content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/dialog`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function settingsDialog (content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))
  }
}

export function favoriteCategoriesDialog (content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))
    dispatch(AnalyticsActions.trackScreen('/favorites/categories'))
  }
}

export function publisherCategoriesDialog (publisher, content) {
  return dispatch => {
    dispatch(UIActions.openModal(content))

    let publisherSlug = _result(publisher, 'slug')
    const analyticsUrl = `/${publisherSlug}/categories`
    if (publisherSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function closeModal () {
  return dispatch => dispatch(UIActions.closeModal())
}
