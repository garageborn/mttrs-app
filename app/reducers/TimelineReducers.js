import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED,
  TIMELINE_PULL_TO_REFRESH
} from '../constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false,
  isRefreshing: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, items: [], isRefreshing: true }
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
