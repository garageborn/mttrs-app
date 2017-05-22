import { NavigationActions } from 'react-navigation'
import _result from 'lodash/result'
import { AnalyticsActions, UIActions } from './index'

export function home () {
  return (dispatch, getState) => {
    dispatch(NavigationActions.navigate({ routeName: 'summaries' }))
    dispatch(AnalyticsActions.trackScreen(`/${publisher.slug}`))
  }
}

export function link (story, link) {
  return (dispatch, getState) => {
    const params = { story: story, link: link }
    dispatch(NavigationActions.navigate({ routeName: 'link', params }))
    dispatch(AnalyticsActions.trackScreen(`/link/${link.slug}`))
  }
}

export function selectCategory (category) {
  return (dispatch, getState) => {
    // TODO
  }
}

export function publisher (publisher) {
  return (dispatch, getState) => {
    dispatch(NavigationActions.navigate({ routeName: 'publisher', params: { publisher } }))
    dispatch(AnalyticsActions.trackScreen(`/${publisher.slug}`))
  }
}

export function storyLinks (story, content) {
  return (dispatch, getState) => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/story-links`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function socialCount (story, content) {
  return (dispatch, getState) => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/social-count`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function storyDialog (story, content) {
  return (dispatch, getState) => {
    dispatch(UIActions.openModal(content))

    let linkSlug = _result(story, 'main_link.slug')
    const analyticsUrl = `/link/${linkSlug}/dialog`
    if (linkSlug) dispatch(AnalyticsActions.trackScreen(analyticsUrl))
  }
}

export function closeModal () {
  return (dispatch, getState) => dispatch(UIActions.closeModal())
}

export function back () {
  return (dispatch, getState) => dispatch(NavigationActions.back())
}
