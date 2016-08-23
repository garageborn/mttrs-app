import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED
} from '../constants/ActionTypes'
import * as API from '../api/index'
import moment from '../common/utils/Moment'

export function requestTimeline() {
  return {
    type: REQUEST_TIMELINE
  }
}

export function receiveTimeline() {
  return {
    type: TIMELINE_RECEIVED
  }
}

export function getTimeline(options) {
  return dispatch => {
    dispatch(requestTimeline())
    let promise = null

    if (options.filter) {
      promise = dispatch(getFilterStories(options))
    } else {
      promise = dispatch(getDatesStories(options))
    }

    return promise.then(() => { return dispatch(receiveTimeline()) })
  }
}

function receiveStories(date, stories) {
  return {
    type: TIMELINE_DATE_RECEIVED,
    date: date,
    stories: stories
  }
}

function getFilterStories(options) {
  return dispatch => {
    let filter = options.filter
    delete options.filter
    let query = Object.assign({ popular: true, limit: 30 }, options)
    query[filter] = true

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveStories(filter, response.body))
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
        dispatch(receiveStories(date, response.body))
      })
  }
}
