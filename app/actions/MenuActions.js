import { OPEN_MENU, CLOSE_MENU, RETRACT_MENU, CHANGE_MENU_TAB } from '../constants/ActionTypes'

export const openMenu = () => ({
  type: OPEN_MENU
})

export const retractMenu = () => ({
  type: RETRACT_MENU
})

export const closeMenu = () => ({
  type: CLOSE_MENU
})

export const changeMenuTab = (tabId) => ({
  type: CHANGE_MENU_TAB,
  payload: tabId
})
