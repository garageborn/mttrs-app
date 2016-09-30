import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

export function link(link) {
  return (dispatch, getState) => {
    let route = Router.getRoute('link', { link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }
}

export function storyLinks() {
  // const { dispatch, navigation, params, story } = this.props
  // let storyLinksParams = { open: true, story: story }
  // let sectionParams = Object.assign({}, params.section, { storyLinks: storyLinksParams })
  // let newParams = Object.assign({}, params, { section: sectionParams })
  // dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
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
