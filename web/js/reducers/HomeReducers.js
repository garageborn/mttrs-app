import {HOME_STORIES_RECEIVED} from 'constants/ActionTypes'

let defaultState = {
  stories: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case HOME_STORIES_RECEIVED:
      return {...state, stories: action.stories}
    default:
      return state
  }
}
