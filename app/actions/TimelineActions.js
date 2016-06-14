import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED
} from 'mttrs/app/constants/ActionTypes'
import * as API from 'mttrs/app/api/index'
import moment from 'moment'

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
    let dates = dateInterval()

    let promises = dateInterval().map((date) => {
      return dispatch(getDateStories(date, options))
    })

    return Promise.all(promises).then(() => {
      return dispatch(receiveTimeline())
    })
  }
}

export function receiveDateStories(date, stories) {
  return {
    type: TIMELINE_DATE_RECEIVED,
    date: date,
    stories: stories
  }
}

function getDateStories(date, options) {
  return dispatch => {
    let query = Object.assign({ published_at: date, popular: true, limit: 10 }, options)

    return API.getStories(query)
      .then((response) => {
        if (!response.ok) return
        dispatch(receiveDateStories(date, response.body))
      })
  }
}

function dateInterval() {
  let days = []
  let today = moment()
  for (let i = 0; i < 5; i++) {
    let date = today.subtract(1, 'days').startOf('day').unix()
    days.push(date)
  }
  return days
}
