import apolloClient from '../config/apolloClient'

export const apollo = apolloClient.reducer()
export {default as uiReducer} from './uiReducer'
export {default as StorageReducer} from './StorageReducer'
export {default as NotificationsReducer} from './NotificationsReducer'
export {default as TenantReducer} from './TenantReducer'
