import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED,
  TIMELINE_DATE_REQUEST,
  TIMELINE_PULL_TO_REFRESH,
  TIMELINE_PULL_TO_REFRESH_COMPLETED
} from '../constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false,
  isFetchingTop: false
}

const replaceItem = (source, index, item) => {
  if (index === -1) {
    return source.concat(item)
  } else {
    return [
      ...source.slice(0, index),
      item,
      ...source.slice(index + 1)
    ]
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case TIMELINE_DATE_REQUEST:
      let timelineDateItem = state.items.find((item) => item.date === action.date)
      let index = state.items.indexOf(timelineDateItem)
      let newTimelineDateItem = Object.assign({}, timelineDateItem, { date: action.date, isFetching: true })
      let timelineDateItems = replaceItem(state.items, index, newTimelineDateItem)
      let sortedItems = timelineDateItems.sort((a, b) => { return b.date - a.date })
      return { ...state, items: sortedItems }
    case TIMELINE_DATE_RECEIVED:
      let items = state.items.slice(0)
      let dateItem = items.find((item) => item.date === action.date)
      Object.assign(dateItem, { stories: action.stories, isFetching: false })
      return { ...state, items: items }
    case TIMELINE_RECEIVED:
      return { ...state, isFetching: false }
    case TIMELINE_PULL_TO_REFRESH:
      return { ...state, isFetchingTop: true }
    case TIMELINE_PULL_TO_REFRESH_COMPLETED:
      return { ...state, isFetchingTop: false }
    case REQUEST_TIMELINE:
      return { ...state, items: [], isFetching: true }
    default:
      return state
  }
}
