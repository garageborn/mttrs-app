import { NavigationActions } from 'react-navigation'
import _result from 'lodash/result'
import { AnalyticsActions, UIActions } from './index'

// AppNavigator
export function home () {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'summaries' }))
    dispatch(AnalyticsActions.trackScreen(`/${publisher.slug}`))
  }
}

export function link (story, link) {
  return dispatch => {
    const params = { story: story, link: link }
    dispatch(NavigationActions.navigate({ routeName: 'link', params }))
    dispatch(AnalyticsActions.trackScreen(`/link/${link.slug}`))
  }
}

export function publisher (publisher) {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'publisher', params: { publisher } }))
    dispatch(AnalyticsActions.trackScreen(`/${publisher.slug}`))
  }
}

export function settings () {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: 'settings' }))
    dispatch(AnalyticsActions.trackScreen(`/settings`))
  }
}

export function back () {
  return dispatch => dispatch(NavigationActions.back())
}

// MainNavigator
export function selectCategory (category) {
  return (dispatch, getState) => {
    // TODO
  }
}

// FavoritesNavigator
export function favoritesTimeline () {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'favorites',
      action: NavigationActions.navigate({
        routeName: 'favoritesTimeline'
      })
    }))
    dispatch(AnalyticsActions.trackScreen('/favorites'))
  }
}

export function favoritePublishers () {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'favorites',
      action: NavigationActions.navigate({
        routeName: 'favoritePublishers'
      })
    }))
    dispatch(AnalyticsActions.trackScreen('/favorites/publishers'))
  }
}

export function addFavorites () {
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'favorites',
      action: NavigationActions.navigate({
        routeName: 'addFavorites'
      })
    }))
    dispatch(AnalyticsActions.trackScreen('/favorites/add'))
  }
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

    const analyticsUrl = '/settings'
    dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function closeModal () {
  return dispatch => dispatch(UIActions.closeModal())
}
