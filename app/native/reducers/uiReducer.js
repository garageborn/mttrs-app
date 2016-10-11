
import { TOGGLE_MENU, CHANGE_MENU_TAB } from '../../constants/ActionTypes'

let defaultState = {
  menu: {
    isOpened: false,
    currentTab: 'categories'
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpened: !state.menu.isOpened
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
