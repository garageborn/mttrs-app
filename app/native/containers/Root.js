import React, { Component, PropTypes } from 'react'
import { Router } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import { StatusBar, Platform } from 'react-native'
import Routes from '../config/Routes'

const RouterWithRedux = connect()(Router)

class Root extends Component {
  render() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('default')
    }

    const {store} = this.props
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={Routes.all(store)} />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
