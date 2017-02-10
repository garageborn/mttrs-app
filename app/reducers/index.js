import { NavigationReducer } from '@exponent/ex-navigation'
import apolloClient from '../config/apolloClient'

export const navigation = NavigationReducer
export const apollo = apolloClient.reducer()
export {default as uiReducer} from './uiReducer'
export {default as StorageReducer} from './StorageReducer'
