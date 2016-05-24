import {STORIES_RECEIVED} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  stories: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case STORIES_RECEIVED:
      return {...state, stories: action.stories}
    default:
      return state
  }
}
