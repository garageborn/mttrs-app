import { SHOW_ERROR_DISCLAIMER, RESET_ERROR_STATE } from '../constants/ActionTypes'

export const showErrorDisclaimer = () => ({
  type: SHOW_ERROR_DISCLAIMER
})

export const resetErrorState = () => ({
  type: RESET_ERROR_STATE
})
