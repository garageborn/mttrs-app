import { OPEN_MODAL, CLOSE_MODAL } from '../constants/ActionTypes'

export const openModal = (content) => ({
  type: OPEN_MODAL,
  content
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})
