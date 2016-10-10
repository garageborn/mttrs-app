import { TOGGLE_MENU } from '../../constants/ActionTypes'

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
    default:
      return state
  }
}
