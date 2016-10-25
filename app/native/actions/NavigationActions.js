import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

export function home() {
  console.log('home')
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)

    let menuParams = Object.assign({}, params.menu, { open: false })
    let newParams = Object.assign({}, params, { section: null, menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

export function link(link) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const route = Router.getRoute('link', { link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }
}

export function selectCategory(category) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)
    let sectionParams = Object.assign({}, params.section, { name: 'category', model: category })
    let newParams = Object.assign({}, params, { section: sectionParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

export function selectPublisher(publisher) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)

    let menuParams = Object.assign({}, params.menu, { open: false })
    let sectionParams = Object.assign({}, params.section, { name: 'publisher', model: publisher })
    let newParams = Object.assign({}, params, { section: sectionParams, menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

export function storyLinks(storyLinksParams) {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    const params = getCurrentParams(getState)

    let sectionParams = Object.assign({}, params.section, { storyLinks: storyLinksParams })
    let newParams = Object.assign({}, params, { section: sectionParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }
}

export function back() {
  return (dispatch, getState) => {
    const navigation = getNavigation(getState)
    dispatch(NavigationActions.pop(navigation.currentNavigatorUID))
  }
}

function getNavigation(getState) {
  return getState().navigation
}

function getCurrentNavigator(getState) {
  const navigation = getNavigation(getState)
  return navigation.navigators[navigation.currentNavigatorUID]
}

function getCurrentRoute(getState) {
  const navigator = getCurrentNavigator(getState)
  return navigator.routes[navigator.index]
}

function getCurrentParams(getState) {
  const currentRoute = getCurrentRoute(getState)
  return currentRoute.params
}
