import {CATEGORY_RECEIVED, CATEGORY_STORIES_RECEIVED} from 'constants/ActionTypes'

let defaultState = {
  stories: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case CATEGORY_RECEIVED:
      return {...state, category: action.category}
    case CATEGORY_STORIES_RECEIVED:
      return {...state, stories: action.stories}
    default:
      return state
  }
}
