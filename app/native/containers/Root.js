import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'
import { StatusBar, Platform } from 'react-native'
import { NavigationContext, NavigationProvider, StackNavigation, } from '@exponent/ex-navigation'
import Router from '../config/Router'

class Root extends Component {
  render() {
    if (Platform.OS === 'ios') StatusBar.setBarStyle('light-content')

    const { store } = this.props
    const navigationContext = new NavigationContext({ router: Router, store: store })

    return (
      <Provider store={store}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={Router.getRoute('timeline')} />
        </NavigationProvider>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
