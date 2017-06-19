import { AsyncStorage, InteractionManager } from 'react-native'
import apolloClient from '../config/apolloClient'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'
import { DEVICE_LANGUAGE } from '../constants/Locale'
import { ASSIGN_TENANT, REQUEST_TENANT, TENANT_RECEIVED } from '../constants/ActionTypes'
import { NavigationActions } from '../actions/index'

const tenantKey = 'tenant'

export const requestTenant = () => ({
  type: REQUEST_TENANT
})

export const assignTenant = () => ({
  type: ASSIGN_TENANT
})

export const receiveTenant = (tenant) => {
  return (dispatch, getState) => {
    Tenant.current = tenant
    return dispatch({ type: TENANT_RECEIVED, tenant })
  }
}

export function setCurrent (tenantId) {
  const tenant = Tenant.find(tenantId)

  return (dispatch, getState) => {
    const previousTenant = getState().TenantReducer.current
    if (previousTenant === tenant) return

    dispatch(assignTenant())
    AsyncStorage.setItem(tenantKey, tenant.id, (error) => {
      if (error) return captureError(error)
      dispatch(onSetCurrent(previousTenant, tenant))
    })
  }
}

export function getCurrent () {
  return (dispatch, getState) => {
    if (getState().TenantReducer.isFetching || getState().TenantReducer.isAssigning) return
    dispatch(requestTenant())

    AsyncStorage.getItem(tenantKey, (error, storageTenant) => {
      if (error) return captureError(error)
      dispatch(onGetCurrent(storageTenant))
    })
  }
}

function onSetCurrent (previousTenant, tenant) {
  return (dispatch, getState) => {
    if (previousTenant && previousTenant !== tenant) {
      dispatch(reloadApp(tenant))
    } else {
      dispatch(receiveTenant(tenant))
    }
  }
}

function onGetCurrent (storageTenant) {
  const fallbackTenant = Tenant.findByLanguage(DEVICE_LANGUAGE)
  return (dispatch, getState) => {
    if (getState().TenantReducer.isAssigning) return

    if (storageTenant) {
      dispatch(receiveTenant(Tenant.find(storageTenant)))
    } else {
      dispatch(setCurrent(fallbackTenant.id))
    }
  }
}

function reloadApp (tenant) {
  return (dispatch) => {
    InteractionManager.runAfterInteractions(() => {
      apolloClient.resetStore()
      dispatch(receiveTenant(tenant))
      dispatch(NavigationActions.popular())
    })
  }
}
