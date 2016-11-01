import { NavigationReducer } from '@exponent/ex-navigation'
import apolloClient from '../config/apolloClient'

export const navigation = NavigationReducer
export const apollo = apolloClient.reducer()
export {default as CategoriesReducers} from '../../reducers/CategoriesReducers'
export {default as CurrentCategoryReducer} from '../../reducers/CurrentCategoryReducer'
export {default as CurrentPublisherReducer} from '../../reducers/CurrentPublisherReducer'
export {default as FilterReducers} from '../../reducers/FilterReducers'
export {default as PublishersReducers} from '../../reducers/PublishersReducers'
export {default as TimelineReducers} from '../../reducers/TimelineReducers'
export {default as uiReducer} from './uiReducer'
export {default as StorageReducer} from './StorageReducer'
