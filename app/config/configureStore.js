import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import apolloClient from './apolloClient'
import thunkMiddleware from 'redux-thunk'
import * as reducers from '../reducers/index'
import { AppNavigator } from '../config/MainNavigator'

const navReducer = (state, action) => {
  return AppNavigator.router.getStateForAction(action, state)
}

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(apolloClient.middleware())
)(createStore)

const rootReducer = combineReducers({
  nav: navReducer,
  ...reducers
})

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
