import { OPEN_MODAL, CLOSE_MODAL } from '../constants/ActionTypes'

let defaultState = {
  modal: { isOpen: false, content: null }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: true,
          content: action.content
        }
      }
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          content: null
        }
      }
    default:
      return state
  }
}
