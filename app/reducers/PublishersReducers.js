import {PUBLISHERS_RECEIVED} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  publishers: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case PUBLISHERS_RECEIVED:
      return {...state, publishers: action.publishers}
    default:
      return state
  }
}
