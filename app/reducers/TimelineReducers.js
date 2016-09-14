import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED,
  TIMELINE_PULL_TO_REFRESH,
  TIMELINE_REQUEST_TODAY,
  TIMELINE_RECEIVED_TODAY
} from '../constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false,
  isRefreshing: false
}

const dates = (state = defaultState, action) => {
  switch (action.type) {
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, items: [], isRefreshing: true }
    case TIMELINE_DATE_REQUEST:
      return { ...state, items: [], isFetching: true }
    case TIMELINE_DATE_RECEIVED:
      return { ...state, items: action.date }
  }
}

const stories = (state = defaultState, action) => {
  switch (action.type) {
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, items: [], isRefreshing: true }
    case TIMELINE_STORIES_REQUEST:
      return { ...state, items: [], isFetching: true }
    case TIMELINE_STORIES_RECEIVED:
      return { ...state, items: action.stories }
  }
}

// Something like:

/*
  case TIMELINE_RECEIVED:
    return { ...state, [action.date]: date() }
*/

export default function(state = defaultState, action) {
  switch (action.type) {
    case TIMELINE_REQUEST_TODAY:
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, items: [], isRefreshing: true }
    case TIMELINE_RECEIVED_TODAY:
      return { ...state, items: [], isFetching: false }
    case REQUEST_TIMELINE:
      return { ...state, items: [], isFetching: true }
    case TIMELINE_RECEIVED:
      return { ...state, isFetching: false, isRefreshing: false }
    case TIMELINE_DATE_RECEIVED:
      let newItem = Object.assign({}, { date: action.date, stories: action.stories })
      let newItems = state.items.concat(newItem)
      let sortedItems = newItems.sort((a, b) => { return b.date - a.date })
      return { ...state, items: sortedItems }
    default:
      return state
  }
}
