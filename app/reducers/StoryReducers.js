import {REQUEST_STORIES, STORIES_RECEIVED} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  stories: [],
  isFetching: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_STORIES:
      return {...state, stories: [], isFetching: true }
    case STORIES_RECEIVED:
      return {...state, stories: action.stories, isFetching: false }
    default:
      return state
  }
}
