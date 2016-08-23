import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import Root from '../containers/Root'
import * as CategoryActions from '../../actions/CategoryActions'
import * as PublishersActions from '../../actions/PublishersActions'

class Routes {
  static fetchData({ dispatch }) {
    return [
      dispatch(CategoryActions.getCategories()),
      dispatch(PublishersActions.getPublishers())
    ]
  }

  static all(store) {
    let categories = store.getState().CategoriesReducers.categories

    return Actions.create(
      <Scene key='root' hideNavBar={true}>
        { Routes.defaultRoutes() }
        { Routes.categoriesRoutes(categories) }
      </Scene>
    )
  }

  static defaultRoutes() {
    return [
      <Scene key='home' component={Root}/>
    ]
  }

  static categoriesRoutes(categories) {
    return [
      <Scene key='category' component={Root}/>
    ]
  }
}

export default Routes
