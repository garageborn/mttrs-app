import { NavigationReducer } from '@exponent/ex-navigation'
import apolloClient from '../config/apolloClient'

export const navigation = NavigationReducer
export const apollo = apolloClient.reducer()
export {default as uiReducer} from './uiReducer'
export {default as NotificationsReducer} from './NotificationsReducer'
export {default as OnboardingReducer} from './OnboardingReducer'
export {default as TenantReducer} from './TenantReducer'
export {default as VisitedStoriesReducer} from './VisitedStoriesReducer'
