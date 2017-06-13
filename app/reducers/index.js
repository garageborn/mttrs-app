import apolloClient from '../config/apolloClient'

export const apollo = apolloClient.reducer()
export {default as CategoriesReducer} from './CategoriesReducer'
export {default as FavoritePublishersReducer} from './FavoritePublishersReducer'
export {default as FavoritesReducer} from './FavoritesReducer'
export {default as NotificationsReducer} from './NotificationsReducer'
export {default as OnboardingReducer} from './OnboardingReducer'
export {default as PublishersReducer} from './PublishersReducer'
export {default as RouterReducer} from './RouterReducer'
export {default as TenantReducer} from './TenantReducer'
export {default as UIReducer} from './UIReducer'
