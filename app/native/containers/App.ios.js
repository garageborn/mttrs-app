import React, { Component, PropTypes } from 'react'
import { Router } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import { Text, StatusBar } from 'react-native'
import Root from './Root'
import Routes from '../config/Routes'

const RouterWithRedux = connect()(Router)

class App extends Component {
  render() {
    StatusBar.setBarStyle('light-content')

    const {store} = this.props
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={Routes.all(store)} />
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
