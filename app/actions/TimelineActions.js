import {
  REQUEST_TIMELINE, TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED, TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH, TIMELINE_PULL_TO_REFRESH_COMPLETED,
  TIMELINE_PULL_TO_INFINITE, TIMELINE_PULL_TO_INFINITE_COMPLETED
} from '../constants/ActionTypes'
import * as API from '../api/index'
import moment from '../common/utils/Moment'
import _last from 'lodash/last'

const startDays = 3

export const requestTimeline = () => ({
  type: REQUEST_TIMELINE
})

export const requestDate = (date) => ({
  type: TIMELINE_DATE_REQUEST,
  date
})

export const pullToRefreshTimeline = () => ({
  type: TIMELINE_PULL_TO_REFRESH
})

export const pullToRefreshTimelineCompleted = () => ({
  type: TIMELINE_PULL_TO_REFRESH_COMPLETED
})

export const pullToInfiniteTimeline = () => ({
  type: TIMELINE_PULL_TO_INFINITE
})

export const pullToInfiniteTimelineCompleted = () => ({
  type: TIMELINE_PULL_TO_INFINITE_COMPLETED
})

export const timelineReceived = () => ({
  type: TIMELINE_RECEIVED
})

export const pullToRefresh = (options) => {
  return dispatch => {
    let today = moment().startOf('day').unix()
    dispatch(pullToRefreshTimeline())

    let promise = dispatch(getDateStories(today, options))
    return promise.then(() => dispatch(pullToRefreshTimelineCompleted()))
  }
}

export const infiniteToRefresh = (options) => {
  return (dispatch, getState) => {
    let lastDay = _last(getState().TimelineReducers.items)
    let lastDayNext = moment.unix(lastDay.date).subtract(1, 'days').startOf('day').unix()
    dispatch(pullToInfiniteTimeline())
    let promise = dispatch(getDateStories(lastDayNext, options))
    return promise.then(() => dispatch(pullToInfiniteTimelineCompleted()))
  }
}

export function getTimeline(options) {
  return dispatch => {
    dispatch(requestTimeline())

    let promise = null

    options.filter
      ? promise = dispatch(getFilterStories(options))
      : promise = dispatch(getDatesStories(options))

    return promise.then(() => dispatch(timelineReceived()))
  }
}

const receiveDateStories = (date, stories, options) => ({
  type: TIMELINE_DATE_RECEIVED,
  date,
  stories,
  options
})

function getFilterStories(options) {
  return dispatch => {
    let filter = options.filter
    delete options.filter
    let query = Object.assign({ popular: true, limit: 30 }, options)
    query[filter] = true

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveDateStories(filter, response.body))
      })
  }
}

function getDatesStories(options) {
  return dispatch => {
    let days = []
    for (let i = 0; i < startDays; i++)
      days.push(moment().subtract(i, 'days').startOf('day').unix())

    let promises = days.map((date) => {
      return dispatch(getDateStories(date, options))
    })

    return Promise.all(promises)
  }
}

function getDateStories(date, options) {
  return dispatch => {
    dispatch(requestDate(date))
    let query = Object.assign({ published_at: date, popular: true, limit: 10 }, options)

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveDateStories(date, response.body, options))
      })
  }
}
