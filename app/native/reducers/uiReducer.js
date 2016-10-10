<<<<<<< 0472cbb0843539e8d534badd1ed8c1e645e3b41e
import { TOGGLE_MENU, CHANGE_MENU_TAB } from '../../constants/ActionTypes'
=======
import { TOGGLE_MENU } from '../../constants/ActionTypes'
>>>>>>> Create uiReducer and migrate toggleMenu action

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
