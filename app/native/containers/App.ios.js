// import React, { Component, PropTypes } from 'react'
// import { Router } from 'react-native-router-flux'
// import { Provider, connect } from 'react-redux'
// import { Text, StatusBar } from 'react-native'
// import Root from './Root'
// import Routes from '../config/Routes'
//
// const RouterWithRedux = connect()(Router)
//
// class App extends Component {
//   render() {
//     StatusBar.setBarStyle('light-content')
//
//     const {store} = this.props
//     return (
//       <Provider store={store}>
//         <RouterWithRedux scenes={Routes.all(store)} />
//       </Provider>
//     )
//   }
// }
//
// App.propTypes = {
//   store: PropTypes.object.isRequired
// }
//
// export default App

import React, { Component } from 'react'
import { View } from 'react-native'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'

class App extends Component {
  render () {
    return (
      <View>
        <HeaderContainer />
        <TimelineContainer />
      </View>
    )
  }
}

export default App
