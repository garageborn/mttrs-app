import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED,
  TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH
} from '../constants/ActionTypes'
import * as API from '../api/index'
import moment from '../common/utils/Moment'

export const requestTimeline = () => ({
  type: REQUEST_TIMELINE
})

export const requestDate = () => ({
  type: TIMELINE_DATE_REQUEST,
  requestAt: Date.now()
})

export const pullToRefreshTimeline = () => ({
  type: TIMELINE_PULL_TO_REFRESH
})

export const getTodayStories = (options) => {
  return dispatch => {
    dispatch(requestDate())
    let today = moment().startOf('day').unix()
    return dispatch(getDateStories(today, options))
  }
}

export function getTimeline(options) {
  return dispatch => {
    options.pullToRefresh
      ? dispatch(pullToRefreshTimeline())
      : dispatch(requestTimeline())

    let promise = null

    options.filter
      ? promise = dispatch(getFilterStories(options))
      : promise = dispatch(getDatesStories(options))

    // return promise.then(() => { return dispatch(receiveTimeline()) })
    return Promise.all(promise)
  }
}

const receiveTimeline = (date, stories) => ({
  type: TIMELINE_RECEIVED,
  date,
  stories,
  receivedAt: Date.now()
})

// const receiveStories = (date, stories) => ({
//   type: TIMELINE_DATE_RECEIVED,
//   date,
//   stories
// })

function getFilterStories(options) {
  return dispatch => {
    let filter = options.filter
    delete options.filter
    let query = Object.assign({ popular: true, limit: 30 }, options)
    query[filter] = true

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveTimeline(filter, response.body))
      })
  }
}

function getDatesStories(options) {
  return dispatch => {
    let days = []
    for (let i = 0; i < 7; i++)
      days.push(moment().subtract(i, 'days').startOf('day').unix())

    let promises = days.map((date) => {
      return dispatch(getDateStories(date, options))
    })

    return Promise.all(promises)
  }
}

function getDateStories(date, options) {
  return dispatch => {
    let query = Object.assign({ published_at: date, popular: true, limit: 10 }, options)

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveTimeline(date, response.body))
      })
  }
}
