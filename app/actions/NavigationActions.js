import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'
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
    const navigation = getNavigation(getState)
    if (!navigation) return null

    const route = Router.getRoute('link', { story: story, link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
    dispatch(AnalyticsActions.trackScreen(`/link/${link.slug}`))
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
    const currentRoute = getCurrentRoute(getState)
    const route = Router.getRoute('timeline', newParams)
    if (currentRoute.routeName === 'link') {
      dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
    } else {
      dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
    }
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
