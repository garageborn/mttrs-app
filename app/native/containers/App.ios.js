import React, { Component } from 'react'
import {
  StatusBar,
  View
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from '../styles/app'
import HeaderContainer from './HeaderContainer'

export default class App extends Component {
  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')

    this.dismissSubscription = () => {
      StatusBar.setBarStyle('light-content')
    }

    SafariView.addEventListener('onDismiss', this.dismissSubscription)
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <HeaderContainer />
        </View>
      </View>
    )
  }
}
