import { AsyncStorage } from 'react-native'
import captureError from '../common/utils/captureError'
import { stringify } from '../common/utils/Parser'
import { SHOW_ONBOARDING, REQUEST_ONBOARDING } from '../constants/ActionTypes'

export const requestOnboarding = () => ({
  type: REQUEST_ONBOARDING
})

export const showOnboarding = show => ({
  type: SHOW_ONBOARDING,
  show
})

export function closeOnboarding () {
  return dispatch => {
    dispatch(this.showOnboarding(false))
    try {
      AsyncStorage.setItem('showOnboarding', stringify(false))
    } catch (error) {
      captureError(error)
    }
  }
}

export function getOnboardingStatus () {
  return dispatch => {
    dispatch(this.requestOnboarding())
    AsyncStorage.getItem('showOnboarding', (error, data) => {
      if (error) captureError(error)

      if (data === null) {
        dispatch(this.showOnboarding(true))
      } else {
        dispatch(this.showOnboarding(false))
      }
    })
  }
}
