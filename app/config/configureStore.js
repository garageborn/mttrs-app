import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import apolloClient from './apolloClient'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers/index'
import AppNavigator from '../navigators/AppNavigator'
import PopularNavigator from '../navigators/PopularNavigator'
import routesTrackingMiddleware from '../common/utils/routesTrackingMiddleware'

const navReducer = (state, action) => {
  return AppNavigator.router.getStateForAction(action, state)
}

const popularNavReducer = (state, action) => {
  return PopularNavigator.router.getStateForAction(action, state)
}

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(apolloClient.middleware()),
  applyMiddleware(routesTrackingMiddleware)
)(createStore)

const rootReducer = combineReducers({
  nav: navReducer,
  popularNav: popularNavReducer,
  ...reducers
})

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
