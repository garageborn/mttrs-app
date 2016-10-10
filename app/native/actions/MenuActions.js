import { TOGGLE_MENU, CHANGE_MENU_TAB } from '../../constants/ActionTypes'

export const toggleMenu = () => ({
  type: TOGGLE_MENU
})

export const changeMenuTab = (tabId) => ({
  type: CHANGE_MENU_TAB,
  payload: tabId
})
