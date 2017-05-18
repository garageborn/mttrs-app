import apolloClient from '../config/apolloClient'

export const apollo = apolloClient.reducer()
export {default as FavoritePublishersReducer} from './FavoritePublishersReducer'
export {default as NotificationsReducer} from './NotificationsReducer'
export {default as OnboardingReducer} from './OnboardingReducer'
export {default as TenantReducer} from './TenantReducer'
export {default as VisitedStoriesReducer} from './VisitedStoriesReducer'
