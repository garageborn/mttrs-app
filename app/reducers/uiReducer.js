
import { OPEN_MENU, CLOSE_MENU, RETRACT_MENU, CHANGE_MENU_TAB } from '../constants/ActionTypes'

let defaultState = {
  menu: {
    isOpen: false,
    retract: false,
    currentTab: 'categories'
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case OPEN_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: true
        }
      }
    case RETRACT_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          retract: true
        }
      }
    case CLOSE_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: false,
          retract: false
        }
      }
    case CHANGE_MENU_TAB:
      return {
        ...state,
        menu: {
          ...state.menu,
          currentTab: action.payload
        }
      }
    default:
      return state
  }
}
