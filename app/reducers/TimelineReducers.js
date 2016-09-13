import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED,
  TIMELINE_PULL_TO_REFRESH
} from '../constants/ActionTypes'

let defaultState = {
  items: [
    { date: null, stories: [], isFetching: false }
  ],
  // items: [],
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
      // Get date in some way...
      let newItem = Object.assign({}, { date: action.date, stories: [], isFetching: false })
      let newItems = state.items.concat(newItem)
      let sortedItems = newItems.sort((a, b) => { return b.date - a.date })
      console.log(state)
      return { ...state, items: sortedItems }
    case TIMELINE_STORIES_REQUEST:
      return { ...state, items: [{ isFetching: true }] }
    case TIMELINE_STORIES_RECEIVED:
      let newStory = Object.assign({}, { stories: action.stories })
      let newStories = state.items.concat(newStory)
      let sortedStories = newStories.sort((a, b) => { return b.date - a.date })
      return { ...state, items: sortedStories }
    // case TIMELINE_DATE_RECEIVED:
    //   let newItem = Object.assign({}, { date: action.date, stories: action.stories })
    //   let newItems = state.items.concat(newItem)
    //   let sortedItems = newItems.sort((a, b) => { return b.date - a.date })
    //   return { ...state, items: sortedItems }
    default:
      return state
  }
}
