import { AsyncStorage } from 'react-native'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'
import { REQUEST_TENANT, TENANT_RECEIVED } from '../constants/ActionTypes'

const tenantKey = 'tenant'

export const requestTenant = () => ({
  type: REQUEST_TENANT
})

export const receiveTenant = (tenant) => ({
  type: TENANT_RECEIVED,
  tenant
})

export function setCurrentTenant (tenant) {
  return (dispatch) => {
    Tenant.current = tenant
    AsyncStorage.setItem(tenantKey, tenant, (error) => {
      if (error) return captureError(error)
      return dispatch(receiveTenant(tenant))
    })
  }
}

export function getCurrentTenant (locale) {
  let fallbackTenant = Tenant.findByLocale(locale)
  return (dispatch) => {
    dispatch(requestTenant())
    AsyncStorage.getItem(tenantKey, (error, tenant) => {
      if (error) return captureError(error)
      dispatch(setCurrentTenant(tenant || fallbackTenant))
    })
  }
}

