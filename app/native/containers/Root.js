// import React, { Component } from 'react'
// import { View } from 'react-native'
// import HeaderContainer from './HeaderContainer'
// import TimelineContainer from './TimelineContainer'
//
// class Root extends Component {
//   render () {
//     return (
//       <View>
//         <HeaderContainer />
//         <TimelineContainer />
//       </View>
//     )
//   }
// }
//
// export default Root

import React, { Component, PropTypes } from 'react'
import { Router } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import { StatusBar } from 'react-native'
import Routes from '../config/Routes'

const RouterWithRedux = connect()(Router)

class Root extends Component {
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

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
