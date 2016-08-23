import React, { Component } from 'react'
import {
  StatusBar,
  View,
  TouchableHighlight,
  Image,
  Text
} from 'react-native'
import SafariView from 'react-native-safari-view'
import styles from '../styles/app'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'

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
          <TimelineContainer />
        </View>
      </View>
    )
  }
}
