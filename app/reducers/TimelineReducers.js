import {
  REQUEST_TIMELINE,
  TIMELINE_RECEIVED,
  TIMELINE_DATE_RECEIVED
} from 'mttrs/app/constants/ActionTypes'

let defaultState = {
  items: [],
  isFetching: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TIMELINE:
      return {...state, items: [], isFetching: true }
    case TIMELINE_RECEIVED:
      return {...state, isFetching: false }
    case TIMELINE_DATE_RECEIVED:
      state.items.push({ date: action.date, stories: action.stories })
      let sortedItens = state.items.sort((a, b) => { return b.date - a.date})
      return { ...state, items: sortedItens }
    default:
      return state
  }
}
