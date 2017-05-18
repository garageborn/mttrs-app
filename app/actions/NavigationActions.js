import { Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import MainNavigator from '../config/MainNavigator'
import _result from 'lodash/result'
import { AnalyticsActions } from './index'

export function home () {
  return (dispatch, getState) => {
    const params = getCurrentParams(getState)

    const menuResult = _result(params, 'menu')
    const sectionResult = _result(params, 'section')

    const menuParams = { ...menuResult, open: false }
    const sectionParams = { ...sectionResult, name: 'home', model: {} }

    const newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.name}`))
    return dispatch(handleTimelineRoute(newParams))
  }
}

export function link (story, link) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    if (!navigation) return null

    const route = MainNavigator.getRoute('link', { story: story, link: link })
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
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.model.slug}`))
    return dispatch(handleTimelineRoute(newParams))
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
    dispatch(AnalyticsActions.trackScreen(`/${sectionParams.model.slug}`))
    return dispatch(handleTimelineRoute(newParams))
  }
}

export function modal (modalParams) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    if (!navigation) return null

    let sectionParams = Object.assign({}, params.section, { modal: modalParams })
    let newParams = Object.assign({}, params, { section: sectionParams })
    let linkSlug = _result(modalParams, 'story.main_link.slug')
    if (linkSlug) dispatch(handleModalAnalytics(linkSlug, modalParams.type))
    return dispatch(handleTimelineRoute(newParams))
  }
}

export function back () {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
  }
}

function handleModalAnalytics (linkSlug, type) {
  const urls = {
    storyLinks: `/link/${linkSlug}/story-links`,
    socialCount: `/link/${linkSlug}/social-count`
}

  return (dispatch) => {
    dispatch(AnalyticsActions.trackScreen(urls[type]))
  }
}

function handleTimelineRoute (newParams) {
  return (dispatch, getState) => {
    const currentRoute = getCurrentRoute(getState)
    const route = MainNavigator.router.getActionForPathAndParams('timeline')
    // if (currentRoute.routeName !== 'timeline') return dispatch(NavigationActions.navigate(route))
    return dispatch(NavigationActions.setParams({ params: newParams }))
  }
}

function getNavigation (getState) {
  return getState().nav
}

function getCurrentRoute (getState) {
  return getNavigation(getState).routes[getCurrentIndex(getState)]
}

function getCurrentParams (getState) {
  return getCurrentRoute(getState).params
}

function getCurrentIndex (getState) {
  return getState().nav.index
}
