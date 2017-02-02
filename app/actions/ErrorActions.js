import { SHOW_ERROR_DISCLAIMER, HIDE_ERROR_DISCLAIMER } from '../constants/ActionTypes'

export const showErrorDisclaimer = () => ({
  type: SHOW_ERROR_DISCLAIMER
})

export const hideErrorDisclaimer = () => ({
  type: HIDE_ERROR_DISCLAIMER
})
