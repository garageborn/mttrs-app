import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import HomeSceneContainer from '../containers/HomeSceneContainer'
import CategorySceneContainer from '../containers/CategorySceneContainer'
import PublisherSceneContainer from '../containers/PublisherSceneContainer'
import MenuContainer from '../containers/MenuContainer'
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
    return Actions.create(
      <Scene key='root' hideNavBar={true}>
        { Routes.defaultRoutes() }
      </Scene>
    )
  }

  static defaultRoutes() {
    return [
      <Scene key='menu' component={MenuContainer}/>,
      <Scene key='home' component={HomeSceneContainer}/>,
      <Scene key='category' type='replace' component={CategorySceneContainer}/>,
      <Scene key='publisher' type='replace' component={PublisherSceneContainer}/>,
    ]
  }
}

export default Routes
