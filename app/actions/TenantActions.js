import { AsyncStorage } from 'react-native'
import { InteractionManager } from 'react-native'
import apolloClient from '../config/apolloClient'
import Tenant from '../common/utils/Tenant'
import captureError from '../common/utils/captureError'
import { REQUEST_TENANT, TENANT_RECEIVED } from '../constants/ActionTypes'
import {
  MenuActions,
  NavigationActions,
  NotificationsActions,
  StorageActions,
  TenantActions
} from '../actions/index'

const tenantKey = 'tenant'

export const requestTenant = () => ({
  type: REQUEST_TENANT
})

export const receiveTenant = (tenant) => ({
  type: TENANT_RECEIVED,
  tenant
})

export function setCurrent (tenantId) {
  const tenant = Tenant.find(tenantId)

  return (dispatch, getState) => {
    console.log('------setCurrent', getState().TenantReducer, tenant)
    const currentTenantId = getState().TenantReducer.id

    if (currentTenantId === tenant.id) return

    Tenant.current = tenant
    AsyncStorage.setItem(tenantKey, tenant.id, (error) => {
      if (error) return captureError(error)
      dispatch(receiveTenant(tenant.id))
      if (currentTenantId && currentTenantId !== tenant.id) dispatch(reloadApp())
    })
  }
}

export function getCurrent (locale) {
  return (dispatch) => {
    dispatch(requestTenant())

    AsyncStorage.getItem(tenantKey, (error, storageTenant) => {
      if (error) return captureError(error)

      if (storageTenant) {
        dispatch(receiveTenant(storageTenant))
      } else {
        dispatch(setCurrent(Tenant.findByLocale(locale)))
      }
    })
  }
}

function reloadApp () {
  return (dispatch) => {
    dispatch(MenuActions.closeMenu())

    InteractionManager.runAfterInteractions(() => {
      apolloClient.resetStore()
      dispatch(NotificationsActions.handleTags())
      dispatch(NavigationActions.home())
    })
  }
}
