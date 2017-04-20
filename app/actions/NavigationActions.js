import { Platform } from 'react-native'
import { NavigationActions } from '@exponent/ex-navigation'
import SafariView from 'react-native-safari-view'
import Router from '../config/Router'
import _result from 'lodash/result'
import { AnalyticsActions } from './index'

export function home () {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    if (!navigation) return null

    let menuParams = Object.assign({}, params.menu, { open: false })
    let sectionParams = Object.assign({}, params.section, { name: 'home', model: {} })
    let newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.name}`))
  }
}

export function link (story, link) {
  return (dispatch, getState) => {
    dispatch(Platform.select({
      ios: iosLink(story, link),
      android: defaultLink(story, link)
    }))
  }
}

export function selectCategory (category) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    if (!navigation) return null

    let sectionParams = Object.assign({}, params.section, { name: 'category', model: category })
    let newParams = Object.assign({}, params, { section: sectionParams })

    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.model.slug}`))
  }
}

export function selectPublisher (publisher) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    if (!navigation) return null

    let menuParams = Object.assign({}, params.menu, { open: false })
    let sectionParams = Object.assign({}, params.section, { name: 'publisher', model: publisher })
    let newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })

    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.model.slug}`))
  }
}

export function storyLinks (storyLinksParams) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    if (!navigation) return null

    let sectionParams = Object.assign({}, params.section, { storyLinks: storyLinksParams })
    let newParams = Object.assign({}, params, { section: sectionParams })

    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))

    let linkSlug = _result(storyLinksParams, 'story.main_link.slug')
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(`/link/${linkSlug}/story-links`))
  }
}

export function back () {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
  }
}

function getNavigation (getState) {
  return getState().navigation
}

function getCurrentNavigator (getState) {
  const navigation = getNavigation(getState)
  if (!navigation) return
  return navigation.navigators[navigation.currentNavigatorUID]
}

function getCurrentRoute (getState) {
  const navigator = getCurrentNavigator(getState)
  if (!navigator) return
  return navigator.routes[navigator.index]
}

function getCurrentParams (getState) {
  const currentRoute = getCurrentRoute(getState)
  if (!currentRoute) return
  return currentRoute.params
}

function iosLink (story, link) {
  console.log('iosLink', story, link)
  return (dispatch, getState) => {
    const url = link.amp_url || link.url

    SafariView.isAvailable()
      .then(SafariView.show({ url }))
      .catch(error => dispatch(defaultLink(story, link))) // Fallback WebView for iOS 8 and earlier
  }
}

function defaultLink (story, link) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    if (!navigation) return null

    const route = Router.getRoute('link', { story: story, link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
    dispatch(AnalyticsActions.trackScreen(`/link/${link.slug}`))
  }
}
