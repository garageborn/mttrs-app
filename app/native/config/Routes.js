import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import Root from '../containers/Root'

class Routes {
  static all(store) {
    return Actions.create(
        <Scene key='root'>
          { Routes.defaultRoutes() }
        </Scene>
    )
  }

  static defaultRoutes() {
    return [
      <Scene key='login' component={Root} title='batata'/>
    ]
  }
}

export default Routes
